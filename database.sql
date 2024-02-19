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

--Setup user table