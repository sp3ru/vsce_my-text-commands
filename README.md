# my-text-commands README

1. splitIntoWord: Analog Sublime Text - split_selection_into_lines. Разбить линии на строки или слова
2. changeSlash: поменять в выделенном \\ на / и наоборот
3. multiRange: пронумеровать выделенное. Если Первое выделенное число, то начать с него

## Extension Settings

- press CTRL+SHIFT+P
- enter `open keyboard shortcuts`
- find my-text-commands.splitIntoWord
- change bind to `CTRL+SHIFT+L`
- find my-text-commands.changeSlash
- change bind to `CTRL+SHIFT+/`
- find my-text-commands.multiRange
- change bind to `ALT+N`




## Установка из файла .vsix
https://code.visualstudio.com/api/working-with-extensions/publishing-extension#packaging-extensions

 

## Собрать .vsix из репозитория
Установить  Node.js
Установить  vsce
`npm install -g @vscode/vsce`

`cd путь-до/my-text-commands`
`vsce package`


## Release Notes

### 0.0.1

Initial release


## Source code

https://github.com/sp3ru/vsce_my-text-commands