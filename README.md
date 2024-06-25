<div align= "center">
  <img src="https://github.com/Lucerna00/Kiosk_KNU/assets/95912522/fec6141e-f79a-45cc-ae39-c4be5452adab" width="340px" height = "150px"  />
  <h3>
    2024 경북대 종합설계프로젝트2
  </h3>
  <h2 style="border-bottom: 0">
    MILP를 활용한 단일 버티포트 내 UAM 리소스 최적화 시스템
  </h2>
</div>
<br/>

<div align= "center">
  <h1 style="border-bottom: 1px solid #21262d; color: #c9d1d9;"> 🛠️ Tech Stacks </h1>
  <div style="margin: 0 auto; text-align: center;" align= "center">
    <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
    <img src = "https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
    <img src = "https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />
    <br/>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white">
    <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white">
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white">
    <br/>
    <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=Django&logoColor=white">
    <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">
    <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white">
    <img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=for-the-badge&logo=GitHub Actions&logoColor=white">
    <br/>
    <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white">
    <img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white">
    <br/>
    <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white">
    <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">
    <img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=Discord&logoColor=white">
  </div>
</div>
<br/>
<br/>
<br/>

# 1. 과제 배경 및 내용
* ### UAM의 성공적인 상용화를 위한 버티포트 리소스 최적화의 필요성
  2025년 상용화 예정인 UAM(도심항공모빌리티) : 도시의 주요 문제 중 하나인 교통 혼잡 문제를 해결할 수 있는 혁신적인 방안<br/>
  버티포트의 효율적인 운용의 중요성 : 버티포트는 기체의 이착륙, 승객의 탑승 및 하기, 화물의 적재 및 하역, 기체 점검 및 충전 등 다양한 활동이 동시에 이루어지는 중요한 시설임. 이러한 버티포트의 효율적인 운용은 UAM의 성공적인 상용화와 지속 가능한 발전에 있어 필수적임.

* ### MILP를 적용한 최적화 수식 설정
    버티포트 내 리소스의 최적 배치를 위해 혼합 정수 선형 계획법(MILP)을 사용하여 수식을 설정함. 의사 결정 변수와 목적함수, 제약 조건을 적절히 설정하여 최적의 리소스 배치 결과가 나오도록 함.

* ### 버티포트 정의 / 수정 및 가중치 설정 가능
    사용자는 버티포트의 리소스를 정의하고 수정할 수 있으며, 각 리소스의 중요도에 따라 가중치를 설정할 수 있음. 이를 통해 최적화 모델이 각 버티포트의 고유한 요구사항과 운영 조건을 반영할 수 있음.

* ### 다양한 차트를 통한 최적화 결과 확인
    최적화 결과를 시각적으로 확인할 수 있도록 다양한 차트(막대 차트, 파이 차트 등)를 제공함 이를 통해 리소스 사용 현황, 혼잡도 감소 효과, 이용률 증가 등의 성과를 직관적으로 파악할 수 있음.
<br/>
<br/>
<br/>

# 2. 과제 내용
## 2-1. Use Case Diagram
<img src="https://github.com/Lucerna00/Kiosk_KNU/assets/95912522/906381c7-9513-47e6-abc0-abdf12ed853e" width="340px" height = "450px" />

## 2-2. ER 다이어그램 & DB 테이블
<img src="https://github.com/Lucerna00/Kiosk_KNU/assets/95912522/67f85d21-a5ab-4ae2-a13e-7f6eb176b7ab" width="500px" height = "300px" />
<img src="https://github.com/Lucerna00/Kiosk_KNU/assets/95912522/ea7ca72a-9104-47ee-8777-0d66e8873fa6" width="340px" height = "350px" />

## 2-3. Sequence Diagram
* ### 버티포트 리소스 최적화
    <img src="https://github.com/Lucerna00/Kiosk_KNU/assets/95912522/ceb49f06-4999-4319-8f1c-ca59883d962b" width="340px" height = "450px" />

* ### 버티포트 조회
    <img src="https://github.com/Lucerna00/Kiosk_KNU/assets/95912522/ae9ebfad-6905-4123-837f-d8e646f9b254" width="340px" height = "230px" />

* ### 버티포트 추가
    <img src="https://github.com/Lucerna00/Kiosk_KNU/assets/95912522/69f676e9-36fe-4cd9-a642-461eb19f70d9" width="340px" height = "450px" />

* ### 버티포트 삭제
    <img src="https://github.com/Lucerna00/Kiosk_KNU/assets/95912522/a4213f93-6b64-495b-b71e-4416b6c10211" width="340px" height = "450px" />

## 2-4 시스템 아키텍처
  <img src="https://github.com/Lucerna00/Kiosk_KNU/assets/95912522/429ba9c1-1016-4c00-b16d-158c90223608" width="500px" height = "250px" />

* ### 프론트엔드 : React Framework, HTML, Js, css
    화면 디자인과 사용자 인터페이스를 담당함.<br/>
    최적화 결과에 대한 시각적 표현을 위해 Chart.js , Nivo와 같은 도구들을 활용함.

* ### 백엔드 : Django Framework
    ### Web Server : NGINX
    ### WSGI : Gunicorn
    ### 데이터베이스 : MySQL
    ### CI/CD : GitHub Actions
    MySQL를 이용하여 데이터베이스(DB)를 설계하고, Django 프레임워크를 활용하여 서버 구축함.<br/>
    MVT패턴을 통해 데이터들의 객체인 Model, 로직들을 처리하는 View를 개발함.<br/>
    AWS EC2를 통해 배포하였고, GitHub Actions로 보다 간편한 유지보수 환경을 마련함.

* ### 알고리즘 : Python PLPuLP library
    혼합 정수 선형 계획법으로 단일 버티포트 내 리소스를 최적화하는 알고리즘을 개발함.
    

* ### 협업 툴 : Github, Notion, Figma, Discord

## 2-5 Branch
### main
실제로 배포되는 브랜치

### develop
프로젝트를 진행하는 브랜치<br/>
완료된 feature 브랜치가 병합됨

### feature
각 기능, 이슈로 나눠서 개발하는 브랜치

## 2-6 File structure
### components
재사용 가능한 컴포넌트들을 모아둔 폴더
### assets
이미지, 폰트 등의 자원 파일들이 저장되는 폴더<br/>
컴파일 과정에 포함되지 않는 일부 파일은 public/ 폴더에 배치
### hooks (= hoc)
커스텀 훅이 위치하는 폴더
### pages
페이지 단위의 컴포넌트들을 모아둔 폴더<br/>
ex) 라우팅 라이브러리로 애플리케이션 내 라우팅을 관리할 때의 페이지 컴포넌트
### constants
전체 애플리케이션에서 공통적으로 사용되는 상수들을 정의한 파일들이 모여 있는 폴더<br/>
ex) 전역 스타일 또는 컴포넌트별 스타일 파일
### config
설정 파일들을 모아둔 폴더
### styles
CSS 파일들이 포함되는 폴더
### services (= api)
API 관련 로직이나 모듈 파일들이 위치하는 폴더<br/>
ex) 인증(auth)과 같은 특정 기능과 관련된 파일
### utils
정규 표현식 패턴, 공통 함수 등 전체 애플리케이션에서 공통적으로 사용되는 유틸리티 파일들이 모여 있는 폴더
### contexts
Context API를 사용할 때 관련 파일들이 모여 있는 폴더

## 2-7 시작 가이드
**Backend repository** : https://github.com/Cheetah-19/UAM_KNU_backend.git

### Installation
Frontend
```
  $ git clone https://github.com/Cheetah-19/uam_knu_frontend.git
  $ cd uam_knu_frontend
```
```
  $ npm install
```
Backend
```
  $ git clone https://github.com/Cheetah-19/UAM_KNU_backend.git
  $ cd UAM_KNU_backend
```
```
  $ pip install -r requirements.txt
```
### Run
Frontend
```
  $ npm run
```
Backend
```
  $ python manage.py runserver 0:8000
```

## 2-8 화면 구성
* ### 로그인/회원가입
    <img src="https://github.com/Lucerna00/Kiosk_KNU/assets/95912522/ac12b8b4-58a7-4a79-b38b-893c323a633b" width="450px" height = "250px" />
    <img src="https://github.com/Lucerna00/Kiosk_KNU/assets/95912522/78071304-6d73-4129-91b6-9bd8e3fd048a" width="450px" height = "250px" />

* ### 버티포트 관리
    <img src="https://github.com/Lucerna00/Kiosk_KNU/assets/95912522/320392a0-bcf0-490b-841b-4949e1f36ec6" width="450px" height = "250px" />

* ###  최적화 결과 그래프
    <img src="https://github.com/Lucerna00/Kiosk_KNU/assets/95912522/60c1e7cc-0388-4709-a63f-c8f43e5c6324" width="450px" height = "250px" />
    <img src="https://github.com/Lucerna00/Kiosk_KNU/assets/95912522/05be0603-800c-434f-9b24-c7b9d5587e91" width="450px" height = "250px" />

* ###  마이페이지
    <img src="https://github.com/Lucerna00/Kiosk_KNU/assets/95912522/c929ed25-e3fe-4ef6-ad18-8f6e4b212d5a" width="450px" height = "250px" />
<br/>
<br/>
<br/>

# 3. 과제 성과 
2024년도 한국정보기술학회 하계종합학술대회 **우수논문상(동상)** 수상<br/><img src="https://github.com/Lucerna00/Kiosk_KNU/assets/95912522/13954962-c32d-4e82-9bd0-d0aa40b555b4"/>
<br/>
<br/>
<br/>

# 4. 참여인력
컴퓨터학부<br/>
<table>
  <tr>
    <td><a href="https://github.com/baegopababjo">김다훈</td>
    <td><a href="https://github.com/Lucerna00">박준석</td>
    <td><a href="https://github.com/WannaBeTop">신동혁</td>
    <td><a href="https://github.com/Apoliasm">신영재</td>
    <td><a href="https://github.com/Usimth">이승운</td>
  </tr>
  <tr>
    <td>프론트엔드</td>
    <td>백엔드</td>
    <td>프론트엔드</td>
    <td>총괄, MILP 알고리즘</td>
    <td>MILP 알고리즘</td>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/baegopababjo">
        <img style="border: 0px solid black !important; border-radius:50%;" src="https://github.com/Apoliasm/2023_nov_hackathon/assets/113246980/e8c1beee-db7f-48ca-b8e3-c14f3493e414" width="150px" height = "150px" />
      </a>
   </td>
    <td>
      <a href="https://github.com/Lucerna00">
        <img style="border: 0px solid black !important; border-radius:50%; " src="https://github.com/Apoliasm/2023_nov_hackathon/assets/113246980/e3837edf-b81f-4f38-ad58-3139d996caef" width="150px" height = "150px" />
      </a>
   </td>
    <td>
      <a href="https://github.com/WannaBeTop">
        <img style="border: 0px solid black !important; border-radius:50%; " src="https://github.com/Apoliasm/2023_nov_hackathon/assets/113246980/e8c1beee-db7f-48ca-b8e3-c14f3493e414" width="150px" height = "150px" />
      </a>
   </td>
   <td>
      <a href="https://github.com/Apoliasm">
        <img style="border: 0px solid black !important; border-radius:50%;" src="https://github.com/Apoliasm/2023_nov_hackathon/assets/113246980/576d230f-0a78-46f5-869c-ed5717cfc614" width="150px" height = "150px" />
      </a>
   </td>
     <td>
       <a href="https://github.com/Usimth">
        <img style="border: 0px solid black !important; border-radius:50%; " src="https://github.com/Apoliasm/2023_nov_hackathon/assets/113246980/f5c8a24d-0c18-489f-966d-06a209d0ea0f" width="150px" height = "150px" />
       </a>
   </td>
  </tr>
</table>
<br/>