## Проект

Небольшое приложение на mongodb, express, react, nodejs

## Установка
- Склонировать
- Выполнить npm install в корневой папке и npm install в папке client


## Запуск
- Запуск сервер: npm run server
- Запуск клиента: npm run client
- Оба скрипта запускаем с корневой папки(сервер 5000 порт, клиент 3000 ,прокси на 5000)

## Как работает приложение
- Корневой роут - это форма клиента(/)
- Чтобы зайти в Админку надо перети на /sign-in роут
- Создан дефолтный юзер-админ (login: Admin/ pass: 13371337)
- При успешной отправки формы, форма сбрасывается, иначе показывают ошибки
- Ошибки приходят с бэка
- В качестве ui компоментов был взят react-bootstrap
- Инн просто захэшировал, с помощью bcryptjs. Можно было двустороннее сделать, но в требованиях вроде такого нет.
- Фронт на реакт, функциональные компоненты, на хуках, без стейт менеджера, так как небольшое приложение.
 