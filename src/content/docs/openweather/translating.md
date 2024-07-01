---
title: OpenWeather Refined Translating
description: Contributing translations in OpenWeather Refined
---

[GitHub Repository](https://github.com/penguin-teal/gnome-openweather/)

[GNOME Extensions Page](https://extensions.gnome.org/extension/6655/)

## Prerequisites

- Git
- Gettext & Make
- A text editor or specialized translation editor
    - Some text editors include: Vim, Emacs, Nano, Gedit
    - Some translation editors: Gtranslator, Poedit, Lokalize

## Forking the Repo

First fork the repository on GitHub then clone it to your desktop.

## Files

The `po/` folder contains a lot of `*.po` files that are the translation files
you will edit. They look like the following:

- `en.po` would be the general English file
- `en_US.po` would be the American English file

If your locale is set to `en_GB` (British English) in this situation the
`en.po` file would be used as it is an English catch-all, however if you had
your locale set to `en_US` (American English) it would use the `en_US.po`
file.

### Creating a new Language

Most major language files already exist in the project but if there isn't one
you can create a new language with the `msginit` program:

```shell
$ msginit -i ./po/openweather.pot -o ./po/LANGUAGE.po
```

(Replace `LANGUAGE` with your language tag)

## Editing

Open the file in your editor. If you are using a plain text editor, make sure
to look at the fields at the top and adjust the time, name, email, etc.

The GUI editors are intuitive and the syntax of the plain text files is mostly
self-explanatory (you fill in the `msgstr` field).

### Format Specifiers

Format specifiers look like `%s` and they are dynamically replaced with a
piece of text. It should be present in the translation.

## Checking

Ensure there are no syntax errors by running `make mergepo`:

### Common Errors

#### Unexpected Newline

You can use multiple lines in a translation for organization, but each
line should be contained in quotes (`"`). For example:

```po
msgstr "This sentence is really long so it's gonna be "
"two lines in the file here"
```

#### Missing Format Specifiers

If there are format specifiers like `%s` that many must be in the translation:

```po
msgid "%s in the trash and %s on the elevator"
msgstr "%s in the bin and %s on the lift"
```

## Submitting

Commit with a name like `Better Spanish Translations` and submit a pull
request.

