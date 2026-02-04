---
title: API Wiki Project API v1.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="api-wiki-project-api">API Wiki Project API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

API Wiki 프로젝트 명세서

Base URLs:

* <a href="https://apiwiki-api.my-project.cloud">https://apiwiki-api.my-project.cloud</a>

# Authentication

- HTTP Authentication, scheme: bearer 

<h1 id="api-wiki-project-api-api-">API 탐색</h1>

Explore 페이지 API 목록 조회 + 필터 + 상세 조회

## toggleFavorite

<a id="opIdtoggleFavorite"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://apiwiki-api.my-project.cloud/api/v1/apis/{apiId}/favorite \
  -H 'Accept: */*' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://apiwiki-api.my-project.cloud/api/v1/apis/{apiId}/favorite HTTP/1.1
Host: apiwiki-api.my-project.cloud
Accept: */*

```

```javascript

const headers = {
  'Accept':'*/*',
  'Authorization':'Bearer {access-token}'
};

fetch('https://apiwiki-api.my-project.cloud/api/v1/apis/{apiId}/favorite',
{
  method: 'POST',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => '*/*',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://apiwiki-api.my-project.cloud/api/v1/apis/{apiId}/favorite',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': '*/*',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://apiwiki-api.my-project.cloud/api/v1/apis/{apiId}/favorite', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => '*/*',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://apiwiki-api.my-project.cloud/api/v1/apis/{apiId}/favorite', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://apiwiki-api.my-project.cloud/api/v1/apis/{apiId}/favorite");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"*/*"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://apiwiki-api.my-project.cloud/api/v1/apis/{apiId}/favorite", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/v1/apis/{apiId}/favorite`

*API 좋아요 By 이노*

해당 API를 좋아요(북마크) 합니다.
이미 좋아요된 상태에서 한 번 더 호출하면 기존의 좋아요를 취소할 수 있습니다.

<h3 id="togglefavorite-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|apiId|path|integer(int64)|true|none|

> Example responses

> 200 Response

<h3 id="togglefavorite-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|API 상세 조회 성공|[ApiResponseFavoriteToggle](#schemaapiresponsefavoritetoggle)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|요청한 API를 찾을 수 없습니다. (API4001)|[ApiResponseFavoriteToggle](#schemaapiresponsefavoritetoggle)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## searchApis

<a id="opIdsearchApis"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://apiwiki-api.my-project.cloud/api/v1/apis \
  -H 'Accept: */*' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET https://apiwiki-api.my-project.cloud/api/v1/apis HTTP/1.1
Host: apiwiki-api.my-project.cloud
Accept: */*

```

```javascript

const headers = {
  'Accept':'*/*',
  'Authorization':'Bearer {access-token}'
};

fetch('https://apiwiki-api.my-project.cloud/api/v1/apis',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => '*/*',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'https://apiwiki-api.my-project.cloud/api/v1/apis',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': '*/*',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('https://apiwiki-api.my-project.cloud/api/v1/apis', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => '*/*',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://apiwiki-api.my-project.cloud/api/v1/apis', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://apiwiki-api.my-project.cloud/api/v1/apis");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"*/*"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://apiwiki-api.my-project.cloud/api/v1/apis", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/v1/apis`

*API 목록 조회 (Explore + 필터) By 악어*

Explore 페이지용 API 목록 조회입니다.

▪ page는 0-based 입니다.
▪ 기본 size = 16
▪ 모든 필터는 조합 가능합니다.

[정렬 옵션]
- latest : 최신 등록순 (기본값)
- popular : 조회수 순
- mostReviewed : 리뷰 많은 순

<h3 id="searchapis-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer(int32)|false|none|
|size|query|integer(int32)|false|none|
|categoryId|query|integer(int64)|false|none|
|q|query|string|false|none|
|sort|query|string|false|none|
|direction|query|string|false|none|
|providers|query|string|false|none|
|authTypes|query|string|false|none|
|pricingTypes|query|string|false|none|
|minRating|query|number|false|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|sort|LATEST|
|sort|POPULAR|
|sort|MOST_REVIEWED|
|direction|ASC|
|direction|DESC|
|providers|KAKAO|
|providers|NAVER|
|providers|GOOGLE|
|providers|MICROSOFT|
|providers|AMAZON|
|providers|META|
|providers|IBM|
|providers|APPLE|
|providers|SPOTIFY|
|providers|ATLASSIAN|
|providers|OPEN_WEATHER|
|providers|TELEGRAM|
|providers|MIXPANEL|
|providers|STRIPE|
|providers|LINKEDIN|
|providers|DISCORD|
|providers|ASANA|
|providers|WOLFRAM|
|providers|NOTION|
|providers|HUBSPOT|
|providers|PEXELS|
|providers|SLACK|
|providers|OPEN_STREET_MAP|
|providers|PAYPAL|
|providers|REDDIT|
|providers|DROPBOX|
|providers|DEEPL|
|providers|TWILIO|
|providers|NEWS_API|
|providers|OPEN_AI|
|providers|MAILCHIMP|
|providers|SHOPIFY|
|providers|SQUARE|
|providers|AMPLITUDE|
|providers|ZOOM|
|providers|AUTOMATTIC|
|providers|UNSPLASH|
|providers|SENDGRID|
|providers|GIPHY|
|providers|GITHUB|
|providers|TWITTER|
|providers|SALESFORCE|
|providers|OPEN_DATA|
|providers|ETC|
|authTypes|OAUTH2|
|authTypes|REFRESH_TOKEN|
|authTypes|ACCESS_TOKEN|
|authTypes|API_KEY|
|authTypes|JWT|
|authTypes|COOKIE|
|authTypes|BASIC|
|pricingTypes|FREE|
|pricingTypes|PAID|
|pricingTypes|MIXED|

> Example responses

> 200 Response

<h3 id="searchapis-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|API 상세 조회 성공|[ApiResponsePageResponseDTOApiPreview](#schemaapiresponsepageresponsedtoapipreview)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|요청한 API를 찾을 수 없습니다. (API4001)|[ApiResponsePageResponseDTOApiPreview](#schemaapiresponsepageresponsedtoapipreview)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## getApiDetail

<a id="opIdgetApiDetail"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://apiwiki-api.my-project.cloud/api/v1/apis/{apiId} \
  -H 'Accept: */*' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET https://apiwiki-api.my-project.cloud/api/v1/apis/{apiId} HTTP/1.1
Host: apiwiki-api.my-project.cloud
Accept: */*

```

```javascript

const headers = {
  'Accept':'*/*',
  'Authorization':'Bearer {access-token}'
};

fetch('https://apiwiki-api.my-project.cloud/api/v1/apis/{apiId}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => '*/*',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'https://apiwiki-api.my-project.cloud/api/v1/apis/{apiId}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': '*/*',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('https://apiwiki-api.my-project.cloud/api/v1/apis/{apiId}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => '*/*',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://apiwiki-api.my-project.cloud/api/v1/apis/{apiId}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://apiwiki-api.my-project.cloud/api/v1/apis/{apiId}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"*/*"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://apiwiki-api.my-project.cloud/api/v1/apis/{apiId}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/v1/apis/{apiId}`

*API 상세 조회 By 제인*

API 개요 탭에서 한줄 설명, 카테고리 태그, 긴 설명 등을 반환합니다.

<h3 id="getapidetail-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|apiId|path|integer(int64)|true|none|

> Example responses

> 200 Response

<h3 id="getapidetail-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|API 상세 조회 성공|[ApiResponseApiDetail](#schemaapiresponseapidetail)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|요청한 API를 찾을 수 없습니다. (API4001)|[ApiResponseApiDetail](#schemaapiresponseapidetail)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

<h1 id="api-wiki-project-api-user-controller">user-controller</h1>

## viewMyWikiHistory

<a id="opIdviewMyWikiHistory"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://apiwiki-api.my-project.cloud/api/v1/users/me/wikis \
  -H 'Accept: */*' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://apiwiki-api.my-project.cloud/api/v1/users/me/wikis HTTP/1.1
Host: apiwiki-api.my-project.cloud
Accept: */*

```

```javascript

const headers = {
  'Accept':'*/*',
  'Authorization':'Bearer {access-token}'
};

fetch('https://apiwiki-api.my-project.cloud/api/v1/users/me/wikis',
{
  method: 'POST',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => '*/*',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://apiwiki-api.my-project.cloud/api/v1/users/me/wikis',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': '*/*',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://apiwiki-api.my-project.cloud/api/v1/users/me/wikis', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => '*/*',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://apiwiki-api.my-project.cloud/api/v1/users/me/wikis', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://apiwiki-api.my-project.cloud/api/v1/users/me/wikis");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"*/*"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://apiwiki-api.my-project.cloud/api/v1/users/me/wikis", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/v1/users/me/wikis`

*내가 편집한 위키 목록보기 API By 이노*

해당 API를 호출한 사용자의 위키 편집 목록을 리스트로 제공합니다.<br>
<br>
▪ page는 0-based 입니다.<br>
▪ 기본 size = 16

<h3 id="viewmywikihistory-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer(int32)|false|none|
|size|query|integer(int32)|false|none|

> Example responses

> 200 Response

<h3 id="viewmywikihistory-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|성공|[ApiResponsePageResponseDTOMyWikiHistory](#schemaapiresponsepageresponsedtomywikihistory)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|실패|[ApiResponsePageResponseDTOMyWikiHistory](#schemaapiresponsepageresponsedtomywikihistory)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## signUp

<a id="opIdsignUp"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://apiwiki-api.my-project.cloud/api/v1/auth/signup \
  -H 'Content-Type: application/json' \
  -H 'Accept: */*' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://apiwiki-api.my-project.cloud/api/v1/auth/signup HTTP/1.1
Host: apiwiki-api.my-project.cloud
Content-Type: application/json
Accept: */*

```

```javascript
const inputBody = '{
  "email": "string",
  "password": "string",
  "nickname": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'*/*',
  'Authorization':'Bearer {access-token}'
};

fetch('https://apiwiki-api.my-project.cloud/api/v1/auth/signup',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => '*/*',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://apiwiki-api.my-project.cloud/api/v1/auth/signup',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': '*/*',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://apiwiki-api.my-project.cloud/api/v1/auth/signup', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => '*/*',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://apiwiki-api.my-project.cloud/api/v1/auth/signup', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://apiwiki-api.my-project.cloud/api/v1/auth/signup");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"*/*"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://apiwiki-api.my-project.cloud/api/v1/auth/signup", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/v1/auth/signup`

*회원가입 API By 이노*

회원가입 정보를 받아 새로운 유저를 등록합니다.

> Body parameter

```json
{
  "email": "string",
  "password": "string",
  "nickname": "string"
}
```

<h3 id="signup-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[Signup](#schemasignup)|true|none|

> Example responses

> 200 Response

<h3 id="signup-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|성공|[ApiResponseLoginRes](#schemaapiresponseloginres)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|실패|[ApiResponseLoginRes](#schemaapiresponseloginres)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## login

<a id="opIdlogin"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://apiwiki-api.my-project.cloud/api/v1/auth/login \
  -H 'Content-Type: application/json' \
  -H 'Accept: */*' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://apiwiki-api.my-project.cloud/api/v1/auth/login HTTP/1.1
Host: apiwiki-api.my-project.cloud
Content-Type: application/json
Accept: */*

```

```javascript
const inputBody = '{
  "email": "string",
  "password": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'*/*',
  'Authorization':'Bearer {access-token}'
};

fetch('https://apiwiki-api.my-project.cloud/api/v1/auth/login',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => '*/*',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://apiwiki-api.my-project.cloud/api/v1/auth/login',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': '*/*',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://apiwiki-api.my-project.cloud/api/v1/auth/login', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => '*/*',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://apiwiki-api.my-project.cloud/api/v1/auth/login', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://apiwiki-api.my-project.cloud/api/v1/auth/login");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"*/*"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://apiwiki-api.my-project.cloud/api/v1/auth/login", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/v1/auth/login`

*로그인 API By 이노*

회원의 정보를 받아 로그인합니다.

> Body parameter

```json
{
  "email": "string",
  "password": "string"
}
```

<h3 id="login-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[LoginReq](#schemaloginreq)|true|none|

> Example responses

> 200 Response

<h3 id="login-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|성공|[ApiResponseLoginRes](#schemaapiresponseloginres)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|실패|[ApiResponseLoginRes](#schemaapiresponseloginres)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## logout

<a id="opIdlogout"></a>

> Code samples

```shell
# You can also use wget
curl -X PATCH https://apiwiki-api.my-project.cloud/api/v1/auth/logout \
  -H 'Accept: */*' \
  -H 'Authorization: Bearer {access-token}'

```

```http
PATCH https://apiwiki-api.my-project.cloud/api/v1/auth/logout HTTP/1.1
Host: apiwiki-api.my-project.cloud
Accept: */*

```

```javascript

const headers = {
  'Accept':'*/*',
  'Authorization':'Bearer {access-token}'
};

fetch('https://apiwiki-api.my-project.cloud/api/v1/auth/logout',
{
  method: 'PATCH',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => '*/*',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.patch 'https://apiwiki-api.my-project.cloud/api/v1/auth/logout',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': '*/*',
  'Authorization': 'Bearer {access-token}'
}

r = requests.patch('https://apiwiki-api.my-project.cloud/api/v1/auth/logout', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => '*/*',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PATCH','https://apiwiki-api.my-project.cloud/api/v1/auth/logout', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://apiwiki-api.my-project.cloud/api/v1/auth/logout");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PATCH");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"*/*"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PATCH", "https://apiwiki-api.my-project.cloud/api/v1/auth/logout", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PATCH /api/v1/auth/logout`

*로그아웃 API By 이노*

로그아웃합니다.<br>
실제 로그아웃 로직(토큰 블랙리스트 등)은 현재 백엔드 상에서 구현되어 있지 않습니다.<br>
<br>
**[프론트엔드 동작]**<br>
프론트엔드 측에서 해당 응답을 받으면 로컬 스토리지/쿠키의 토큰을 삭제하면 됩니다.

> Example responses

> 200 Response

<h3 id="logout-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|성공|[ApiResponseString](#schemaapiresponsestring)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|실패|[ApiResponseString](#schemaapiresponsestring)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## getMyProfile

<a id="opIdgetMyProfile"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://apiwiki-api.my-project.cloud/api/v1/users/me \
  -H 'Accept: */*' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET https://apiwiki-api.my-project.cloud/api/v1/users/me HTTP/1.1
Host: apiwiki-api.my-project.cloud
Accept: */*

```

```javascript

const headers = {
  'Accept':'*/*',
  'Authorization':'Bearer {access-token}'
};

fetch('https://apiwiki-api.my-project.cloud/api/v1/users/me',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => '*/*',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'https://apiwiki-api.my-project.cloud/api/v1/users/me',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': '*/*',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('https://apiwiki-api.my-project.cloud/api/v1/users/me', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => '*/*',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://apiwiki-api.my-project.cloud/api/v1/users/me', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://apiwiki-api.my-project.cloud/api/v1/users/me");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"*/*"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://apiwiki-api.my-project.cloud/api/v1/users/me", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/v1/users/me`

*내 프로필 조회 API By 제인*

로그인한 사용자의 프로필 정보를 조회합니다.<br>
JWT 인증이 필요하며, 토큰에 담긴 이메일(subject)을 기반으로 사용자를 식별합니다.<br>
<br>
**[응답 정보]**<br>
- nickname: 사용자 닉네임

> Example responses

> 200 Response

<h3 id="getmyprofile-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|성공|[ApiResponseMyProfileRes](#schemaapiresponsemyprofileres)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|인증되지 않은 사용자|[ApiResponseMyProfileRes](#schemaapiresponsemyprofileres)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|사용자 정보 없음|[ApiResponseMyProfileRes](#schemaapiresponsemyprofileres)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

<h1 id="api-wiki-project-api-wiki-controller">wiki-controller</h1>

## returnWiki

<a id="opIdreturnWiki"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://apiwiki-api.my-project.cloud/api/v1/apis/{apiId}/wiki \
  -H 'Accept: */*' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET https://apiwiki-api.my-project.cloud/api/v1/apis/{apiId}/wiki HTTP/1.1
Host: apiwiki-api.my-project.cloud
Accept: */*

```

```javascript

const headers = {
  'Accept':'*/*',
  'Authorization':'Bearer {access-token}'
};

fetch('https://apiwiki-api.my-project.cloud/api/v1/apis/{apiId}/wiki',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => '*/*',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'https://apiwiki-api.my-project.cloud/api/v1/apis/{apiId}/wiki',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': '*/*',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('https://apiwiki-api.my-project.cloud/api/v1/apis/{apiId}/wiki', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => '*/*',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://apiwiki-api.my-project.cloud/api/v1/apis/{apiId}/wiki', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://apiwiki-api.my-project.cloud/api/v1/apis/{apiId}/wiki");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"*/*"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://apiwiki-api.my-project.cloud/api/v1/apis/{apiId}/wiki", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/v1/apis/{apiId}/wiki`

*위키 수정 요청 API By 이노*

위키 수정 버튼을 눌렀을 때 해당 위키의 내용과 버전을 반환합니다.

<h3 id="returnwiki-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|apiId|path|integer(int64)|true|none|

> Example responses

> 200 Response

<h3 id="returnwiki-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|성공|[ApiResponseContent](#schemaapiresponsecontent)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|실패|[ApiResponseContent](#schemaapiresponsecontent)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## editingWiki

<a id="opIdeditingWiki"></a>

> Code samples

```shell
# You can also use wget
curl -X PATCH https://apiwiki-api.my-project.cloud/api/v1/apis/{apiId}/wiki \
  -H 'Content-Type: application/json' \
  -H 'Accept: */*' \
  -H 'Authorization: Bearer {access-token}'

```

```http
PATCH https://apiwiki-api.my-project.cloud/api/v1/apis/{apiId}/wiki HTTP/1.1
Host: apiwiki-api.my-project.cloud
Content-Type: application/json
Accept: */*

```

```javascript
const inputBody = '{
  "content": "string",
  "version": 0
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'*/*',
  'Authorization':'Bearer {access-token}'
};

fetch('https://apiwiki-api.my-project.cloud/api/v1/apis/{apiId}/wiki',
{
  method: 'PATCH',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => '*/*',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.patch 'https://apiwiki-api.my-project.cloud/api/v1/apis/{apiId}/wiki',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': '*/*',
  'Authorization': 'Bearer {access-token}'
}

r = requests.patch('https://apiwiki-api.my-project.cloud/api/v1/apis/{apiId}/wiki', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => '*/*',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PATCH','https://apiwiki-api.my-project.cloud/api/v1/apis/{apiId}/wiki', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://apiwiki-api.my-project.cloud/api/v1/apis/{apiId}/wiki");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PATCH");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"*/*"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PATCH", "https://apiwiki-api.my-project.cloud/api/v1/apis/{apiId}/wiki", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PATCH /api/v1/apis/{apiId}/wiki`

*위키 수정 API By 이노*

위키 수정 완료 버튼을 눌렀을 때 해당 위키의 내용을 수정합니다.
 단, 해당 위키가 이미 수정이 이루어진 위키라면 수정을 중단하고 에러 메시지를 전송합니다.

> Body parameter

```json
{
  "content": "string",
  "version": 0
}
```

<h3 id="editingwiki-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|apiId|path|integer(int64)|true|none|
|body|body|[EditContent](#schemaeditcontent)|true|none|

> Example responses

> 200 Response

<h3 id="editingwiki-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|성공|[ApiResponseString](#schemaapiresponsestring)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|실패|[ApiResponseString](#schemaapiresponsestring)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

<h1 id="api-wiki-project-api-health-controller">health-controller</h1>

## healthCheck

<a id="opIdhealthCheck"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://apiwiki-api.my-project.cloud/health \
  -H 'Accept: */*' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET https://apiwiki-api.my-project.cloud/health HTTP/1.1
Host: apiwiki-api.my-project.cloud
Accept: */*

```

```javascript

const headers = {
  'Accept':'*/*',
  'Authorization':'Bearer {access-token}'
};

fetch('https://apiwiki-api.my-project.cloud/health',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => '*/*',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'https://apiwiki-api.my-project.cloud/health',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': '*/*',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('https://apiwiki-api.my-project.cloud/health', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => '*/*',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://apiwiki-api.my-project.cloud/health', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://apiwiki-api.my-project.cloud/health");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"*/*"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://apiwiki-api.my-project.cloud/health", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /health`

> Example responses

> 200 Response

<h3 id="healthcheck-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|string|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

# Schemas

<h2 id="tocS_ApiResponsePageResponseDTOMyWikiHistory">ApiResponsePageResponseDTOMyWikiHistory</h2>
<!-- backwards compatibility -->
<a id="schemaapiresponsepageresponsedtomywikihistory"></a>
<a id="schema_ApiResponsePageResponseDTOMyWikiHistory"></a>
<a id="tocSapiresponsepageresponsedtomywikihistory"></a>
<a id="tocsapiresponsepageresponsedtomywikihistory"></a>

```json
{
  "isSuccess": true,
  "code": "string",
  "message": "string",
  "result": {
    "content": [
      {
        "requestId": 0,
        "apiId": 0,
        "apiName": "string",
        "editedAt": "2019-08-24T14:15:22Z"
      }
    ],
    "totalPage": 0,
    "totalElements": 0,
    "listSize": 0,
    "currentPage": 0,
    "first": true,
    "last": true
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|isSuccess|boolean|false|none|none|
|code|string|false|none|none|
|message|string|false|none|none|
|result|[PageResponseDTOMyWikiHistory](#schemapageresponsedtomywikihistory)|false|none|none|

<h2 id="tocS_MyWikiHistory">MyWikiHistory</h2>
<!-- backwards compatibility -->
<a id="schemamywikihistory"></a>
<a id="schema_MyWikiHistory"></a>
<a id="tocSmywikihistory"></a>
<a id="tocsmywikihistory"></a>

```json
{
  "requestId": 0,
  "apiId": 0,
  "apiName": "string",
  "editedAt": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|requestId|integer(int64)|false|none|none|
|apiId|integer(int64)|false|none|none|
|apiName|string|false|none|none|
|editedAt|string(date-time)|false|none|none|

<h2 id="tocS_PageResponseDTOMyWikiHistory">PageResponseDTOMyWikiHistory</h2>
<!-- backwards compatibility -->
<a id="schemapageresponsedtomywikihistory"></a>
<a id="schema_PageResponseDTOMyWikiHistory"></a>
<a id="tocSpageresponsedtomywikihistory"></a>
<a id="tocspageresponsedtomywikihistory"></a>

```json
{
  "content": [
    {
      "requestId": 0,
      "apiId": 0,
      "apiName": "string",
      "editedAt": "2019-08-24T14:15:22Z"
    }
  ],
  "totalPage": 0,
  "totalElements": 0,
  "listSize": 0,
  "currentPage": 0,
  "first": true,
  "last": true
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|content|[[MyWikiHistory](#schemamywikihistory)]|false|none|none|
|totalPage|integer(int32)|false|none|none|
|totalElements|integer(int64)|false|none|none|
|listSize|integer(int32)|false|none|none|
|currentPage|integer(int32)|false|none|none|
|first|boolean|false|none|none|
|last|boolean|false|none|none|

<h2 id="tocS_Signup">Signup</h2>
<!-- backwards compatibility -->
<a id="schemasignup"></a>
<a id="schema_Signup"></a>
<a id="tocSsignup"></a>
<a id="tocssignup"></a>

```json
{
  "email": "string",
  "password": "string",
  "nickname": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string|false|none|none|
|password|string|false|none|none|
|nickname|string|false|none|none|

<h2 id="tocS_ApiResponseLoginRes">ApiResponseLoginRes</h2>
<!-- backwards compatibility -->
<a id="schemaapiresponseloginres"></a>
<a id="schema_ApiResponseLoginRes"></a>
<a id="tocSapiresponseloginres"></a>
<a id="tocsapiresponseloginres"></a>

```json
{
  "isSuccess": true,
  "code": "string",
  "message": "string",
  "result": {
    "memberId": 0,
    "accessToken": "string",
    "nickname": "string"
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|isSuccess|boolean|false|none|none|
|code|string|false|none|none|
|message|string|false|none|none|
|result|[LoginRes](#schemaloginres)|false|none|none|

<h2 id="tocS_LoginRes">LoginRes</h2>
<!-- backwards compatibility -->
<a id="schemaloginres"></a>
<a id="schema_LoginRes"></a>
<a id="tocSloginres"></a>
<a id="tocsloginres"></a>

```json
{
  "memberId": 0,
  "accessToken": "string",
  "nickname": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|memberId|integer(int64)|false|none|none|
|accessToken|string|false|none|none|
|nickname|string|false|none|none|

<h2 id="tocS_LoginReq">LoginReq</h2>
<!-- backwards compatibility -->
<a id="schemaloginreq"></a>
<a id="schema_LoginReq"></a>
<a id="tocSloginreq"></a>
<a id="tocsloginreq"></a>

```json
{
  "email": "string",
  "password": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string|false|none|none|
|password|string|false|none|none|

<h2 id="tocS_ApiResponseFavoriteToggle">ApiResponseFavoriteToggle</h2>
<!-- backwards compatibility -->
<a id="schemaapiresponsefavoritetoggle"></a>
<a id="schema_ApiResponseFavoriteToggle"></a>
<a id="tocSapiresponsefavoritetoggle"></a>
<a id="tocsapiresponsefavoritetoggle"></a>

```json
{
  "isSuccess": true,
  "code": "string",
  "message": "string",
  "result": {
    "apiId": 0,
    "isFavorited": true
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|isSuccess|boolean|false|none|none|
|code|string|false|none|none|
|message|string|false|none|none|
|result|[FavoriteToggle](#schemafavoritetoggle)|false|none|none|

<h2 id="tocS_FavoriteToggle">FavoriteToggle</h2>
<!-- backwards compatibility -->
<a id="schemafavoritetoggle"></a>
<a id="schema_FavoriteToggle"></a>
<a id="tocSfavoritetoggle"></a>
<a id="tocsfavoritetoggle"></a>

```json
{
  "apiId": 0,
  "isFavorited": true
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|apiId|integer(int64)|false|none|none|
|isFavorited|boolean|false|none|none|

<h2 id="tocS_ApiResponseString">ApiResponseString</h2>
<!-- backwards compatibility -->
<a id="schemaapiresponsestring"></a>
<a id="schema_ApiResponseString"></a>
<a id="tocSapiresponsestring"></a>
<a id="tocsapiresponsestring"></a>

```json
{
  "isSuccess": true,
  "code": "string",
  "message": "string",
  "result": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|isSuccess|boolean|false|none|none|
|code|string|false|none|none|
|message|string|false|none|none|
|result|string|false|none|none|

<h2 id="tocS_EditContent">EditContent</h2>
<!-- backwards compatibility -->
<a id="schemaeditcontent"></a>
<a id="schema_EditContent"></a>
<a id="tocSeditcontent"></a>
<a id="tocseditcontent"></a>

```json
{
  "content": "string",
  "version": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|content|string|false|none|none|
|version|integer(int64)|false|none|none|

<h2 id="tocS_ApiResponseMyProfileRes">ApiResponseMyProfileRes</h2>
<!-- backwards compatibility -->
<a id="schemaapiresponsemyprofileres"></a>
<a id="schema_ApiResponseMyProfileRes"></a>
<a id="tocSapiresponsemyprofileres"></a>
<a id="tocsapiresponsemyprofileres"></a>

```json
{
  "isSuccess": true,
  "code": "string",
  "message": "string",
  "result": {
    "nickname": "string"
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|isSuccess|boolean|false|none|none|
|code|string|false|none|none|
|message|string|false|none|none|
|result|[MyProfileRes](#schemamyprofileres)|false|none|none|

<h2 id="tocS_MyProfileRes">MyProfileRes</h2>
<!-- backwards compatibility -->
<a id="schemamyprofileres"></a>
<a id="schema_MyProfileRes"></a>
<a id="tocSmyprofileres"></a>
<a id="tocsmyprofileres"></a>

```json
{
  "nickname": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|nickname|string|false|none|none|

<h2 id="tocS_ApiPreview">ApiPreview</h2>
<!-- backwards compatibility -->
<a id="schemaapipreview"></a>
<a id="schema_ApiPreview"></a>
<a id="tocSapipreview"></a>
<a id="tocsapipreview"></a>

```json
{
  "apiId": 0,
  "name": "string",
  "summary": "string",
  "avgRating": 0,
  "reviewCount": 0,
  "viewCounts": 0,
  "pricingType": "FREE",
  "authType": "OAUTH2",
  "providerCompany": "KAKAO",
  "isFavorited": true
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|apiId|integer(int64)|false|none|none|
|name|string|false|none|none|
|summary|string|false|none|none|
|avgRating|number|false|none|none|
|reviewCount|integer(int64)|false|none|none|
|viewCounts|integer(int64)|false|none|none|
|pricingType|string|false|none|none|
|authType|string|false|none|none|
|providerCompany|string|false|none|none|
|isFavorited|boolean|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|pricingType|FREE|
|pricingType|PAID|
|pricingType|MIXED|
|authType|OAUTH2|
|authType|REFRESH_TOKEN|
|authType|ACCESS_TOKEN|
|authType|API_KEY|
|authType|JWT|
|authType|COOKIE|
|authType|BASIC|
|providerCompany|KAKAO|
|providerCompany|NAVER|
|providerCompany|GOOGLE|
|providerCompany|MICROSOFT|
|providerCompany|AMAZON|
|providerCompany|META|
|providerCompany|IBM|
|providerCompany|APPLE|
|providerCompany|SPOTIFY|
|providerCompany|ATLASSIAN|
|providerCompany|OPEN_WEATHER|
|providerCompany|TELEGRAM|
|providerCompany|MIXPANEL|
|providerCompany|STRIPE|
|providerCompany|LINKEDIN|
|providerCompany|DISCORD|
|providerCompany|ASANA|
|providerCompany|WOLFRAM|
|providerCompany|NOTION|
|providerCompany|HUBSPOT|
|providerCompany|PEXELS|
|providerCompany|SLACK|
|providerCompany|OPEN_STREET_MAP|
|providerCompany|PAYPAL|
|providerCompany|REDDIT|
|providerCompany|DROPBOX|
|providerCompany|DEEPL|
|providerCompany|TWILIO|
|providerCompany|NEWS_API|
|providerCompany|OPEN_AI|
|providerCompany|MAILCHIMP|
|providerCompany|SHOPIFY|
|providerCompany|SQUARE|
|providerCompany|AMPLITUDE|
|providerCompany|ZOOM|
|providerCompany|AUTOMATTIC|
|providerCompany|UNSPLASH|
|providerCompany|SENDGRID|
|providerCompany|GIPHY|
|providerCompany|GITHUB|
|providerCompany|TWITTER|
|providerCompany|SALESFORCE|
|providerCompany|OPEN_DATA|
|providerCompany|ETC|

<h2 id="tocS_ApiResponsePageResponseDTOApiPreview">ApiResponsePageResponseDTOApiPreview</h2>
<!-- backwards compatibility -->
<a id="schemaapiresponsepageresponsedtoapipreview"></a>
<a id="schema_ApiResponsePageResponseDTOApiPreview"></a>
<a id="tocSapiresponsepageresponsedtoapipreview"></a>
<a id="tocsapiresponsepageresponsedtoapipreview"></a>

```json
{
  "isSuccess": true,
  "code": "string",
  "message": "string",
  "result": {
    "content": [
      {
        "apiId": 0,
        "name": "string",
        "summary": "string",
        "avgRating": 0,
        "reviewCount": 0,
        "viewCounts": 0,
        "pricingType": "FREE",
        "authType": "OAUTH2",
        "providerCompany": "KAKAO",
        "isFavorited": true
      }
    ],
    "totalPage": 0,
    "totalElements": 0,
    "listSize": 0,
    "currentPage": 0,
    "first": true,
    "last": true
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|isSuccess|boolean|false|none|none|
|code|string|false|none|none|
|message|string|false|none|none|
|result|[PageResponseDTOApiPreview](#schemapageresponsedtoapipreview)|false|none|none|

<h2 id="tocS_PageResponseDTOApiPreview">PageResponseDTOApiPreview</h2>
<!-- backwards compatibility -->
<a id="schemapageresponsedtoapipreview"></a>
<a id="schema_PageResponseDTOApiPreview"></a>
<a id="tocSpageresponsedtoapipreview"></a>
<a id="tocspageresponsedtoapipreview"></a>

```json
{
  "content": [
    {
      "apiId": 0,
      "name": "string",
      "summary": "string",
      "avgRating": 0,
      "reviewCount": 0,
      "viewCounts": 0,
      "pricingType": "FREE",
      "authType": "OAUTH2",
      "providerCompany": "KAKAO",
      "isFavorited": true
    }
  ],
  "totalPage": 0,
  "totalElements": 0,
  "listSize": 0,
  "currentPage": 0,
  "first": true,
  "last": true
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|content|[[ApiPreview](#schemaapipreview)]|false|none|none|
|totalPage|integer(int32)|false|none|none|
|totalElements|integer(int64)|false|none|none|
|listSize|integer(int32)|false|none|none|
|currentPage|integer(int32)|false|none|none|
|first|boolean|false|none|none|
|last|boolean|false|none|none|

<h2 id="tocS_ApiDetail">ApiDetail</h2>
<!-- backwards compatibility -->
<a id="schemaapidetail"></a>
<a id="schema_ApiDetail"></a>
<a id="tocSapidetail"></a>
<a id="tocsapidetail"></a>

```json
{
  "apiId": 0,
  "name": "string",
  "summary": "string",
  "longDescription": "string",
  "officialUrl": "string",
  "avgRating": 0,
  "viewCounts": 0,
  "categories": [
    {
      "categoryId": 0,
      "name": "string"
    }
  ],
  "logo": "string",
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z",
  "isFavorited": true
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|apiId|integer(int64)|false|none|none|
|name|string|false|none|none|
|summary|string|false|none|none|
|longDescription|string|false|none|none|
|officialUrl|string|false|none|none|
|avgRating|number|false|none|none|
|viewCounts|integer(int64)|false|none|none|
|categories|[[CategoryItem](#schemacategoryitem)]|false|none|none|
|logo|string|false|none|none|
|createdAt|string(date-time)|false|none|none|
|updatedAt|string(date-time)|false|none|none|
|isFavorited|boolean|false|none|none|

<h2 id="tocS_ApiResponseApiDetail">ApiResponseApiDetail</h2>
<!-- backwards compatibility -->
<a id="schemaapiresponseapidetail"></a>
<a id="schema_ApiResponseApiDetail"></a>
<a id="tocSapiresponseapidetail"></a>
<a id="tocsapiresponseapidetail"></a>

```json
{
  "isSuccess": true,
  "code": "string",
  "message": "string",
  "result": {
    "apiId": 0,
    "name": "string",
    "summary": "string",
    "longDescription": "string",
    "officialUrl": "string",
    "avgRating": 0,
    "viewCounts": 0,
    "categories": [
      {
        "categoryId": 0,
        "name": "string"
      }
    ],
    "logo": "string",
    "createdAt": "2019-08-24T14:15:22Z",
    "updatedAt": "2019-08-24T14:15:22Z",
    "isFavorited": true
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|isSuccess|boolean|false|none|none|
|code|string|false|none|none|
|message|string|false|none|none|
|result|[ApiDetail](#schemaapidetail)|false|none|none|

<h2 id="tocS_CategoryItem">CategoryItem</h2>
<!-- backwards compatibility -->
<a id="schemacategoryitem"></a>
<a id="schema_CategoryItem"></a>
<a id="tocScategoryitem"></a>
<a id="tocscategoryitem"></a>

```json
{
  "categoryId": 0,
  "name": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|categoryId|integer(int64)|false|none|none|
|name|string|false|none|none|

<h2 id="tocS_ApiResponseContent">ApiResponseContent</h2>
<!-- backwards compatibility -->
<a id="schemaapiresponsecontent"></a>
<a id="schema_ApiResponseContent"></a>
<a id="tocSapiresponsecontent"></a>
<a id="tocsapiresponsecontent"></a>

```json
{
  "isSuccess": true,
  "code": "string",
  "message": "string",
  "result": {
    "content": "string",
    "version": 0
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|isSuccess|boolean|false|none|none|
|code|string|false|none|none|
|message|string|false|none|none|
|result|[Content](#schemacontent)|false|none|none|

<h2 id="tocS_Content">Content</h2>
<!-- backwards compatibility -->
<a id="schemacontent"></a>
<a id="schema_Content"></a>
<a id="tocScontent"></a>
<a id="tocscontent"></a>

```json
{
  "content": "string",
  "version": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|content|string|false|none|none|
|version|integer(int64)|false|none|none|

