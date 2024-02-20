--Setup web database
DO
$do$
BEGIN
    IF EXISTS (SELECT FROM pg_database WHERE datname = 'web') THEN
        RAISE NOTICE 'Database already exists';
    ELSE
        PERFORM dblink_exec('dbname=' || current_database(), 'CREATE DATABASE web');
    END IF;
END
$do$;

--Setup roster table
CREATE TABLE IF NOT EXISTS roster (
    cid int8 PRIMARY KEY,
    email text NOT NULL,
    home_facility text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    rating int8 NOT NULL,
    del_certs float8 NOT NULL,
    gnd_certs float8 NOT NULL,
    twr_certs float8 NOT NULL,
    app_certs float8 NOT NULL,
    ctr_cert int8 NOT NULL,
    initials text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL
)

--Setup user table
CREATE TABLE IF NOT EXISTS users (
    cid int8 PRIMARY KEY,
    email text NOT NULL,
    authorization_code text,
    access_token text,
    refresh_token text,
    session_expiry timestamptz
)
