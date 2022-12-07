// Node.js, Express 패키지를 활용한 간단한 서버 구성
const express = require("express"); // Like import pandas as pd
const app = express();

const clientId = "";
const clientSecret = "";

const httpRequest = require("request");

app.use(express.static("public"));
app.use(express.json());

// 브라우저 URL에 http:127.0.0.1:3000'/' 경로로 요청 시 동작하는 메서드
app.get("/", (request, response) => response.sendFile("index.html"));

// http://localhost:3000'/detect'로 요청했을 때
app.post("/detect", (request, response) => {
    const query = request.body.text;

    // papago에게 데이터 전달
    const url = "https://openapi.naver.com/v1/papago/detectLangs";

    // httpRequest.post('요청 데이터', '요청에 따른 응답 결과 확인 부분');
    const options = {
        url, // url: url
        form: {
            query: query,
        },
        headers: {
            "X-Naver-Client-Id": clientId,
            "X-Naver-Client-Secret": clientSecret,
        },
    };

    // 실제 요청 전송
    httpRequest.post(options, (error, httpResponse, body) => {
        if (!error && response.statusCode === 200) {
            console.log(body);
        } else {
            console.log(
                `error = ${httpResponse.statusCode}, ${httpResponse.statusMessage}`
            );
        }
    });
});

const port = 3000;
app.listen(port, () =>
    console.log(`http://127.0.0.1:${port}/ app listening on port ${port}`)
);

// 서버 실행 명령어 : node 실행할 파일명(server.js)
