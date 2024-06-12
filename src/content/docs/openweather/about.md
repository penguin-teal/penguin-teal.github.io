---
title: OpenWeather Refined
description: A GNOME Shell Extension to display weather for the current or a specified location
---

[GitHub Repository](https://github.com/penguin-teal/gnome-openweather/)

[GNOME Extensions Page](https://extensions.gnome.org/extension/6655/)

## How It Came About

I used to use Jason Oickle's OpenWeather shell extension however when GNOME
45 was released, it no longer worked. Kenneth Topp had become the new maintainer
and added support for GNOME 45, however he never updated it from there and
it still was not on the primary website for GNOME Shell Extensions. Since the
project was licensed as GPL 3.0 or later, I forked the project and am
maintaining it today.

## Installation

### GNOME Extensions Website (Recommended)

[Install at this link.](https://extensions.gnome.org/extension/6655/)

### Packages

If you want a package for another platform, create an [issue](https://github.com/penguin-teal/gnome-openweather/issues/new/choose).
If you make a package, let me know or make a pull request and list it below.

- Arch AUR [gnome-shell-extension-openweatherrefined](https://aur.archlinux.org/packages/gnome-shell-extension-openweatherrefined)
- Fedora Copr [gnome-shell-extension-openweatherrefined](https://copr.fedorainfracloud.org/coprs/fiftydinar/gnome-shell-extension-openweatherrefined/) by [@fiftydinar](https://github.com/fiftydinar)

### Install From Source

Tip: Once you've cloned the repo, you can run `make help` to get information
on a lot of make target and more commands that might be useful.

This method installs to your `~/.local/share/gnome-shell/extensions` directory
from the latest stable source code on the `master` branch.

First make sure you have the following dependencies installed:

| Arch-Based     | Debian-Based                  | Fedora                 |
| ---            | ---                           | ---                    |
| `dconf`        | `dconf-gsettings-backend`     | `dconf`                |
| `gnome-shell`  | `gnome-shell-extension-prefs` | `gnome-extensions-app` |
| `git`          | `git`                         | `git`                  |
| `base-devel`   | `build-essential`             | `glib2-devel`          |
|                | `gettext`                     | `gettext-devel`        |
|                | `libsoup3`                    |                        |

Run the following commands:

```shell
git clone https://github.com/penguin-teal/gnome-openweather.git

cd gnome-openweather

# This switches to the latest stable release
git switch --detach latest

make && make install
```

Restart the GNOME shell:

- X11: `Alt` + `F2`, `r`, `Enter`
- Wayland: Log out/Reboot

Now enable the extension through the *gnome-extensions* app.

## Bugs

Bugs should be reported
[here](https://github.com/penguin-teal/gnome-openweather/issues)
on the GitHub issues page.

## Contributing

Everyone is welcome to contribute! You can contribute code, or translations
via pull requests.

Run `make help` for help on make targets and scripts useful for testing.

### Translating

Translations are super helpful because once I forked
this extension I have made a lot of UI additions, and I only speak English!

Translations can be made by editing the language's file `./po/*.po`.
Edit the `msgstr` field to the translation for the English in `msgid`.

### More

- [OpenWeather Refined Custom API Keys](../custom-keys/)

