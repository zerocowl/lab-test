# LAB TEST API

## Como executar

> #### Crie uma copia do arquivo .env.example, renomei para .env   
---
```bash
 npm i  
 docker-compose -f "docker-compose.yml" up -d --build 
 npx prisma migrate dev  
 nest start  
```
----

## Tecnologias utilizadas:
- Nestjs (https://nestjs.com/)
- Prisma ORM (https://www.prisma.io/)

### Observações
Sempre que atualizar o schema, execute um: ```npx prisma generate```  
