---
title: RIFF Format
description: Reference of the RIFF File Format used to store a variety of data.
---

The **R**esource **I**nterchange **F**ile **F**ormat was developed by Microsoft and IBM in 1991.
It is a container format that stores data in "chunks." The max size of a RIFF file is 4 GiB + 8 B, because of the
use of the unsigned 32-bit integer telling the size of the file at the start (plus the ID, size, and padding byte).


A RIFF file consists of one [RIFF chunk](#riff-chunk) and any possible subchunks. A subchunk is a chunk that is a "child"
of another chunk. Every chunk is a subchunk of the over-arching RIFF chunk.
There are some "standard" chunks, listed [below](#standard-chunks), however a chunk can have any name and contain
any arbitrary data.

Alternatively, a file could start with `RIFX` instead of `RIFF`.
This means that the size will be stored in big-endian instead of little-endian.
[Read more about the RIFX chunk below.](#rifx-chunk)

A hierarchy might look something like this:

- RIFF Chunk
    - LIST Chunk
        - sick Chunk
        - COOL Chunk
    - epic Chunk
    - RAD\x20 Chunk

## Chunk Structure

"LE" means Little Endian. `u8` would mean an unsigned 8-bit integer.

| Offset | Bytes | Name | Type | Description | Examples |
|---|---|---|---|---|---|
| `0x0` | `4` | ID | `u8[4]` | 4 (case-sensitive) ASCII characters, not null-terminated. Reads out a tag ID. It doesn't have to all be letters, for example [WAV's](reference/WAV) `fmt∖x20` chunk. The last character is a space, which I am representing using the ASCII escape code `∖x20`. | `RIFF`, `LIST`, `fmt\x20`, `data` |
| `0x4` | `4` | Size | `LE u32` | The size of the rest of the chunk in bytes. This does not include the 8 bytes making this and the ID fields. | 36, 43, 4702 |
| `0x8` | ~ | Data | ~ | This is the chunk data itself. The size of this chunk is the same as specified by the Size field. This data may be determined by some other format (such as the [WAV format](reference/WAV)). | ... |
| ~ | `0` - `1` | Padding | u8 | If the Size field is an odd number, this padding byte will be present. Otherwise, it does not exist. | `0x0` |

### `RIFF`, `RIFX`, `LIST` Chunk Structure

The `RIFF` (or `RIFX`) and `LIST` chunks have a special field before their payloads.
Their data field consists of the subchunks they hold.

| Offset | Bytes | Name | Type | Description | Examples |
|--------|-------|------|------|-------------|----------|
| `0x0` | `4` | ID | `u8[4]` | 4 ASCII characters. The ID of the chunk. | `RIFF`, `RIFX`, `LIST` |
| `0x4` | `4` | Size | `LE u32` | The size in bytes of the remaining part of the chunk. | 32, 47, 9023 |
| `0x8` | `4` | Format | `u8[4]` | 4 (case-sensitive) ASCII characters. This could be considered part of the data field for these chunks. It _is_ included in the Size field. This can be any arbitrary 4 characters. For `RIFF`/`RIFX` chunks the file format. For example, would indicate that this is an AVI or WAVE file. Or for a `LIST` chunk the type of list. | `WAVE`, `AVI\x01`, `INFO`
| `0xC` | ~ | Data | ~ | This is the chunk data itself. The size of this chunk is the same as specified by the Size field (minus 4 for the Format field). | ... |
| ~ | `0` - `1` | Padding | u8 | If the Size field is an odd number, this padding byte will be present. Otherwise, it does not exist. | `0x0` |

## Standard Chunks

### `RIFF` Chunk

This chunk is the ultimate container that holds every other chunk.
There is one RIFF chunk and it is the first chunk in the file (if it is not it is an invalid
RIFF file). This means that any valid RIFF file will start with this chunk's ID in ASCII, `RIFF`.
This also means that this chunk's Size field is equal to the file size minus 8.

### `RIFX` Chunk

The RIFX chunk can be used instead of the RIFF chunk (I sort of lied when I said a RIFF file must start with a `RIFF` chunk).
The vast majority of the time `RIFX` will not be used. In the case that it is used, `RIFX`
means that the size of the chunk in the Size field is big-endian.

### `LIST` Chunk

#### `INFO` List Type

This chunk provides a standard way to document certain information.
The ID of this chunk is ASCII `INFO`.
This chunk essentially holds a bunch of key-value pairs, some of which are standardized.
The idea behind this chunk is that it is standard so that even if a program does not know the
actual format/purpose of the RIFF file, it can still gather certain information from it.
This chunk is normally placed first (of course inside of the RIFF chunk). It does not have to be,
however this ensures that a program will read it, and not just "give up" after running into a lot
of unknown data.

Standard tags have all uppercase tag IDs.
Non-standard tags tag IDs should be all lowercase.

The values of these tags should be null-terminated for standard tags.
Non-standard tag values may or may not be null-terminated.
If a value is null-terminated, it will be included in the size field (see below).

| ID      | Name |
|---------|------|
| `AGES`  | Rated |
| `CMNT`  | Comment |
| `CODE`  | Encoded By |
| `COMM`  | Comments |
| `DIRC`  | Directory |
| `DISP`  | Sound Scheme Title |
| `DTIM`  | Date Time Original |
| `GENR`  | Genre |
| `IARL`  | Archival Location |
| `IART`  | Artist |
| `IAS1`  |        |


Here is what the data section of a `LIST` chunk of type `INFO` looks like.
This data would immediately come after the Format field that says ASCII `INFO`.

| Offset | Bytes | Name       | Type     | Description | Examples |
|--------|-------|------------|----------|-------------|----------|
| `0x0`  | `4`   | Tag ID     | `u8[4]`  | 4 (case-sensitive) characters making up a tag ID. Standard tag IDs should be all uppercase, and non-standard IDs all lowercase. | `IART`, `colr` |
| `0x4`  | `4`   | Value Size | `LE u32` | The size of the value of this tag in bytes. If the value is null-terminated, this size includes the null. | `11`, `9` |
| `0x8`  | ~     | Value      | `u8[~]`  | The value of the tag as a string made up of ASCII characters. If this is a standard tag, it will be null-terminated. If it is non-standard, it may or may not be null-terminated. | `Lil\x20Fridge\x00`, `orangeRed` |

This key-value structure is repeated enough times until the size satisfies that of the
`LIST` chunk's Size field.

### `JUNK` Chunk

The `JUNK` chunk is used as a space filler to align chunks to boundaries.

## Examples

### Read Chunk In C

This example reads a chunk in C. If you use <code>malloc()</code> as I did, you could even return the
data buffer (and return <code>NULL</code> on fail), just remember to <code>free()</code> it!

```c
// For FILE, fread, and size_t
#include <stdio.h>
// For malloc and free
#include <stdlib.h>
// For bool, true, and false
#include <stdbool.h>
// For uint32_t and uint8_t
#include <stdint.h>
// For memcmp
#include <string.h>

bool readChunk(FILE *file)
{
    size_t countRead;

    // Four character array for chunk ID
    char id[4];
    countRead = fread(id, sizeof id, 1, file);
    // If we couldn't read it return
    if(countRead == 0)
    {
        fprintf(stderr, "Couldn't read chunk ID.");
        return false;
    }

    // Example for testing for specific ID:
    // We use memcmp instead of strcmp because "id" is not null-terminated and therefore
    // would never end as far as strcmp is concerned, meaning that it and a string literal
    // would never be equal.
    if(memcmp(id, "RIFF", sizeof id) == 0)
    {
        printf("We found the RIFF chunk!");
    }
    
    // Get size of data in bytes
    uint32_t dataSize;
    countRead = fread(&dataSize, sizeof(uint32_t), 1, file);
    // If we couldn't read it return
    if(countRead == 0)
    {
        fprintf(stderr, "Couldn't read chunk size.");
        return false;
    }

    // If size of data is odd...
    if(dataSize % 2)
    {
        // ...then let's consume that extra padding byte.
        // We have to give it something to write to (no we can't just pass NULL or something).
        // We will just give it a random byte variable we don't care about.
        uint8_t padding;
        fread(&padding, sizeof(uint8_t), 1, file);
        // Not checking if it read properly because it doesn't really matter
    }

    // We're using malloc here to put the data into, since it could be really big.
    // If you wanted to you could use VLAs or alloca, but I advise against it because this could be huge.
    // If you know that the data is small, using an array or alloca might be okay.
    uint8_t* data = malloc(dataSize);

    countRead = fread(data, dataSize, 1, file);
    // If we couldn't read it return
    if(countRead == 0)
    {
        // Remember to free before returning
        free(data);
        
        fprintf(stderr, "Couldn't read chunk data.");
        return false;
    }

    // Do something with the data...

    // Do not forget to free the data when you're done if using malloc
    free(data);

    return true;
```

