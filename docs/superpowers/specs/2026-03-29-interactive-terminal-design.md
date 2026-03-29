# Interactive Terminal Easter Egg

## Summary

Transform the static `TerminalBlock.vue` into an interactive terminal that accepts typed commands with predetermined humorous responses. The existing static output (whoami, cat skills.json, uptime) remains visible as initial history.

## Interaction Model

- Static output renders on page load (existing behavior preserved)
- Below the static output, a real text input with `$ ` prompt accepts keyboard input
- Pressing Enter executes the command and appends output to the scrollable history
- Terminal auto-scrolls to bottom on new output
- `help` command lists all available commands
- Unknown commands show `command not found` with a hint to type `help`
- Input is disabled during animated commands (terraform apply, npm install)

## Commands

| Command | Response |
|---|---|
| `help` | Table of all commands with descriptions |
| `ls` | Hardcoded repo file listing |
| `cd` | "Where are you going?" |
| `terraform apply` | Animated plan + apply sequence (staggered lines) |
| `rm -rf /` | "No fucking way" |
| `whoami` | `> @salvamiguel` |
| `cat skills.json` | Same skills JSON block |
| `sudo` | "Nice try." |
| `docker run` | "Error: container escaped. It's living its best life now." |
| `git push --force` | "To production? On a Friday? Bold." |
| `kubectl delete pod` | "Pod deleted. Just kidding. I'm not that reckless." |
| `ping google.com` | "64 bytes from google.com: time=0.001ms - yes, I'm that fast" |
| `exit` | "There is no escape. Welcome to my portfolio." |
| `clear` | Clears dynamic history (static output reappears) |
| `python` | ">>> import antigravity - Sorry, this terminal doesn't fly." |
| `curl` | ASCII art response card |
| `aws s3 ls` | "AccessDenied: You need at least 3 certifications to access this bucket." |
| `npm install` | Animated progress bar ending with "added 9,847 packages in 0.3s" |
| Unknown | `command not found: <cmd>. Type 'help' for available commands.` |

## Terraform Animation Sequence

1. Show `Planning...` with brief delay
2. Show plan summary: `Plan: 3 to add, 0 to change, 0 to destroy.`
3. Show `Applying...`
4. Stagger 3 resource creation lines (e.g., `aws_instance.portfolio: Creating...`, then `created`)
5. End with `Apply complete! Resources: 3 added, 0 changed, 0 destroyed.`

## npm install Animation

1. Show a text-based progress bar that fills over ~2 seconds
2. End with `added 9,847 packages in 0.3s`

## Technical Approach

- All logic in `TerminalBlock.vue` (no new files needed)
- `ref<HistoryEntry[]>` for dynamic command history
- Command map object mapping command strings to handler functions
- Prefix matching for commands (e.g., `sudo` matches `sudo anything`)
- Animations use `setTimeout` chains with `async/await` wrappers
- Input disabled via `ref<boolean>` during animations
- Auto-scroll via `scrollIntoView` on a bottom sentinel element
- Terminal container gets `max-h` + `overflow-y-auto` for scrollability

## Architecture

Single component, no new dependencies. The command map is a plain object inside `<script setup>` — easy to extend with new commands later.
