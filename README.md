
🖥  JWT Authentication with .NET and React

### ⚙️  Structure

-   Client w/ TypeScript, Next.js, Redux, React-Bootstrap  ✔️
-   Server w/ .NET Core, Heroku Postgres, JWT Authentication   ✔️

### 🛠  Technologies

#### 👨‍💻 Backend
-  	[.NET Core 3.1](https://dotnet.microsoft.com/download)
 - [Entity Framework Core](https://docs.microsoft.com/pt-br/ef/core/)
 - [JWT](https://jwt.io/)
-  [Heroku PostGres](https://www.heroku.com/postgres)
-  [Npgsql](https://www.npgsql.org/)
#### ⚛️ Frontend
-   [Next.js](https://nextjs.org/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [React Bootstrap](https://react-bootstrap.github.io/)
-   [Axios](https://axios-http.com/)

#### How to Run Locally
**Client:** 
Create a .env file with the following values on the client folder

	REACT_APP_API_AUTH = http://localhost:8000/api/v1/Auth
		   
    
**Server:** 

 1. Add a Postgres connection string the "NpgConnectionString" field in appsettings.json
    
        "NpgConnectionString": "<NPG_CONNECTION_STRING>"
         
 2. Add a JWT secret to the Secret field in appsettings.json

        "Secret": "<JWT_SECRET>"
        
 
