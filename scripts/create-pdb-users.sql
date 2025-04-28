-- sqlplus / as sysdba @/docker-entrypoint-initdb.d/create-pdb-users.sql

ALTER SYSTEM SET db_create_file_dest = '/opt/oracle/oradata' SCOPE=SPFILE;
SHUTDOWN IMMEDIATE;
STARTUP;

-- Crearea unui PDB pentru OLTP
CREATE PLUGGABLE DATABASE oltp ADMIN USER admin IDENTIFIED BY admin;

ALTER PLUGGABLE DATABASE oltp OPEN;

ALTER SESSION SET CONTAINER = oltp;
GRANT ALL PRIVILEGES TO admin;