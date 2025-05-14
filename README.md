# MPA

### How to setup project on Docker:
- run _npm i_
- run _cd backend_ and then _npm i_
- run _cd ../frontend_ and then _npm i_
- run _cd .._ and then _docker compose up -d_ and wait to pull oracle db image + create containers (backend-service expected to fail, as db service is not initialized yet)
- when it's ready, it should look like:
    ![db-ready](/img/db-ready.png)
- in _db_ container, Exec section, run _sqlplus / as sysdba @/docker-entrypoint-initdb.d/create-pdb-users.sql_ and wait for it to execute
- in cmd, run:
  - _docker exec -u root -it **container_id** bash_
  - _yum install nano_, then _y_
  - _cd $ORACLE_HOME/network/admin_
  - _nano tnsnames.ora_
  - then, copy file contents from this repo, at _./config/tnsnames.ora_ and paste in container file
  - _Ctrl + O_ to save and _Ctrl + X_ to close nano

Now, you can run the entire project with only _docker compose up -d_, but run the db first, as it requires some time to startup.