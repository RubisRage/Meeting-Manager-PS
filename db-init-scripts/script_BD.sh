#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE TABLE users(
			user_name			text PRIMARY KEY,
			pwhash				varchar(256) NOT NULL,
			real_name			text NOT NULL,
			img						bytea
		);


		CREATE TABLE organizations(
			id						int PRIMARY KEY,
			name					text NOT NULL,
			inf						text,
			img						bytea
		);

		CREATE TABLE commissions (
			id						int PRIMARY KEY,
			name					text NOT NULL,
			inf						text
		);

		INSERT INTO users VALUES ('MasterJoseph','c4a4238a0b923820dcc509a6f75849b','Jose Manuel Illera Rodríguez', pg_read_binary_file('/db-images/naroto.jpg')::bytea);
	INSERT INTO users VALUES ('Fran_el_crack','c4ca4238a0b923820dcc509a6f75849b','Francisco Jose Santana Sosa', pg_read_binary_file('/db-images/estoyardiendo.jpg')::bytea);
		INSERT INTO users VALUES ('Alejo','c4ca4238a0b923820dcc509a6f75849b','Alejandro Alejo Santana', pg_read_binary_file('/db-images/madera.jpg')::bytea);
	INSERT INTO users VALUES ('Rubenrage','c4ca4238a0b923820dcc509a6f75849b','Rubén Santana Lorenzo', pg_read_binary_file('/db-images/norespiro.jpg')::bytea);
	INSERT INTO users VALUES ('Mastodonte_Cristo','c4ca4238a0b923820dcc509a6f75849b','Cristobal Jimenez', pg_read_binary_file('/db-images/peluca.jpg')::bytea);



EOSQL

