# 프로젝트 제목

## 프로젝트 개요

- **설명**: 이 프로젝트는 React.js, Express.js, MongoDB, Node.js, Socket.IO를 사용하여 구축된 실시간 그룹 채팅 웹 애플리케이션입니다. 사용자는 실시간으로 그룹 채팅에 참여할 수 있으며, 메시지는 실시간으로 모든 참가자에게 전달됩니다.

## 기술 스택

- **프론트엔드**:
  - **React.js**: 사용자 인터페이스를 구축하는 데 사용되었습니다.
  - **Socket.IO Client**: 실시간 양방향 통신을 위해 사용되었습니다.

- **백엔드**:
  - **Node.js**: 서버 환경으로 사용되었습니다.
  - **Express.js**: 라우팅 및 서버 설정을 위해 사용되었습니다.
  - **Socket.IO Server**: 실시간 통신을 처리하기 위해 사용되었습니다.
  - **MongoDB**: 채팅 메시지 및 사용자 데이터를 저장하기 위해 사용되었습니다.
  - **Mongoose**: MongoDB와의 데이터베이스 상호 작용을 위한 ORM으로 사용되었습니다.

## 주요 기능

- **실시간 그룹 채팅**: 사용자는 여러 사용자가 참여하는 채팅방에서 실시간으로 메시지를 주고받을 수 있습니다.
- **사용자 인증 및 세션 관리**: 사용자는 로그인하고 채팅에 참여할 수 있으며, 각 세션은 유지됩니다.
- **메시지 기록 저장**: 사용자의 채팅 기록은 MongoDB에 저장되어 채팅방에 다시 입장했을 때 확인할 수 있습니다.
- **사용자 알림**: 새로운 메시지가 도착하면 모든 사용자에게 알림이 전송됩니다.

## 프로젝트 구조
```bash
chat-app-MERN
├── client
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src
│   │   ├── App.js
│   │   ├── components
│   │   │   ├── dashboard
│   │   │   │   ├── Chat.jsx
│   │   │   │   ├── InputForm.jsx
│   │   │   │   ├── Profile.jsx
│   │   │   │   ├── RoomList.jsx
│   │   │   │   └── Undefined.jsx
│   │   │   └── layout
│   │   │       ├── Footer.jsx
│   │   │       └── Header.jsx
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── sources
│   │   │   ├── css
│   │   │   │   ├── button.css
│   │   │   │   └── dashboard.css
│   │   │   └── images
│   │   │       ├── logo-bg.jpeg
│   │   │       └── logo.png
│   │   └── utils
│   │       ├── APIRoutes.js
│   │       └── setupProxy.js
│   └── yarn.lock
├── package-lock.json
└── server
    ├── controllers
    │   ├── messageController.js
    │   ├── roomController.js
    │   └── userController.js
    ├── index.js
    ├── models
    │   ├── messageModel.js
    │   ├── roomModel.js
    │   └── userModel.js
    ├── package-lock.json
    ├── package.json
    ├── routes
    │   ├── auth.js
    │   ├── message.js
    │   └── room.js
    ├── tempCodeRunnerFile.js
    └── yarn.lock
```

## 설치 및 실행 방법

1. **레포지토리 클론**:
   ```bash
   git clone <레포지토리 URL>
   cd <프로젝트 폴더>

2. **백엔드 설정**:
   서버 폴더로 이동:
   ```bash
   cd server 
   ```
   필요한 패키치 설치:
   ```bash
   npm install
   ```
   MongoDB 연결설정:
   `.env`파일을 생성하고 MongoDB URI 설정
   ```bash
   MONGO_URI=<MongoDB URI>
   PORT=<Port Number>
   REACT_BUILD_PATH=<React Build Path>
   ```
   서버 실행:
   ```bash
   npm start
   ```
3. **프론트엔드 설정**:
   클라이언트 폴더로 이동:
   ```bash
   cd client
   ```
   필요한 패키지 설치:
   ```bash
   npm install
   ```
   프론트엔드 실행:
   ```bash
   npm start
   ```
4. **애플리케이션 접근**:
   웹 브라우저에서 `http://localhost:3000`으로 접근하여 애플리케이션 사용
