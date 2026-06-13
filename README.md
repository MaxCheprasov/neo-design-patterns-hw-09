# Домашнє завдання — Тема 9. Поведінкові патерни: Ітератор та Шаблонний метод

Система завантаження користувачів з API та їх збереження у форматах CSV, JSON і XML.

## Патерни

### Template Method (Шаблонний метод)
Абстрактний клас `DataExporter` визначає незмінний скелет алгоритму:

```
export() → load() → transform() → beforeRender() → render() → afterRender() → save()
```

Підкласи (`CsvExporter`, `JsonExporter`, `XmlExporter`) перевизначають лише абстрактні методи `render()` та `save()`, а також опціональні хуки `beforeRender()` / `afterRender()`.

### Iterator (Ітератор)
Класи `CsvIterator`, `JsonIterator`, `XmlIterator` реалізують вбудований протокол `[Symbol.iterator]()`. Це дозволяє перебирати записи з будь-якого формату через стандартний цикл `for...of`, отримуючи типізований об'єкт `UserData` на кожній ітерації.

## Структура проєкту

```
src/
├── data/
│   └── UserData.ts
├── exporters/
│   ├── DataExporter.ts      # Template Method (abstract)
│   ├── CsvExporter.ts
│   ├── JsonExporter.ts
│   └── XmlExporter.ts
├── iterators/
│   ├── CsvIterator.ts
│   ├── JsonIterator.ts
│   └── XmlIterator.ts
├── main.ts                  # Запускає експорт
└── main-iterate.ts          # Демонструє роботу ітераторів
```

## Запуск

```bash
npm install

# Крок 1: Завантажити дані та зберегти у форматах CSV, JSON, XML
npx ts-node src/main.ts

# Крок 2: Прочитати збережені файли через ітератори
npx ts-node src/main-iterate.ts
```

Результати зберігаються у папці `dist/`.
