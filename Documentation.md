# COVID PORTAL Server
COVID PORTAL is an application to monitor updated covid case in Indonesia and view hospital recomendations in each region.

List of available endpoints:
​
- `POST /register`
- `POST /login`
- `POST /googleLogin`
- `GET /covid/total'
- `GET /news`
- `GET /covid`
- `GET /hospital/:province`

&nbsp;

Tech Stack used to build this app :
* Node JS
* Express JS framework
* PostgreSQL
* Bcryptjs
* Cors
* Axios
* Google-auth-library
* Jsonwebtoken
* Sequelize


&nbsp;

## Global Responses
> These responses are applied globally on all endpoints

_Response (500 - Internal server error)_
```
{
  "message": "Internal server error"
}
```

_Response (400 - Bad request)_
```
{
  "message": "Invalid email or password"
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "Unauthorized"
}
```

&nbsp;

## RESTful endpoints
### POST /register

> Register user

_Request Body_
```
{
    'email': 'string',
    'password': 'string'
}
```
_Response (201 - Created)_
```
 {
    'msg': 'Register success',
    'id': 'integer',
    'email': 'string'
 }
```


### POST /login

> Login user

_Request Body_
```
{
    'email': 'string',
    'password': 'string'
}
```

_Response (200)_
```
 {
    'access_token': 'string'
 }
```


---
### POST /googleLogin

_Request Body_
```
{
    'email': 'string'
}
```

_Response (201 - Created)_
```
 {
    'id': 'integer',
    'email': 'string',
    'access_token': 'string'
 }
```

---
### GET /covid/total

> Get all covid data

_Request Header_
```
{
  'access_token': 'access_token'
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
 {
    'Total': {
        "jumlah_positif": 1361098,
        "jumlah_dirawat": 147845,
        "jumlah_sembuh": 1176356,
        "jumlah_meninggal": 36897
    }
 }
```

---
### GET /news

> Get the latest news about covid19

_Request Header_
```
{
  'access_token': 'access_token'
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
 {
    'Source': {
        'id': 'integer',
        'name': 'string'
    },
    'Author': 'string',
    'Title': 'string',
    'Description': 'string,
    'Url': 'string',
    'UrlToImage': 'string',
    'Content': 'string'
 }
```

---
### GET /covid

> Get all covid data in each region

_Request Header_
```
{
  'access_token': 'access_token'
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
 {
     'provinsi': 'string',
        'kasus': 'integer',
        'dirawat': 'integer',
        'sembuh': 'integer',
        'meninggal': 'integer',
        'last_date': 'date',
        'jenis_kelamin': {
            'laki-laki': 'integer',
            'perempuan': 'integer' 
        },
        'percent': 'float'
 }
```


---
### GET /hospital/:province

> Get hospitals recommendations in each region

_Request Header_
```
{
  'access_token': 'access_token'
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
 {
    'Name': 'string',
    'Address': 'string',
    'Region': 'string',
    'Phone': 'integer',
    'Province': 'string'
 }
```
