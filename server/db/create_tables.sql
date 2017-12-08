drop table users CASCADE;
drop table images CASCADE;
drop table posts CASCADE;
drop table threads CASCADE;
drop table comments CASCADE;


create table images(
  id serial,
  name varchar UNIQUE,

  created_at timestamp,
  updated_at timestamp,
  primary key(id)
);

create table users(
  id serial,
  username varchar,
  password varchar,
  image_id integer,

  created_at timestamp,
  updated_at timestamp,
  primary key(id),
  foreign key(image_id) references images(id)
);

create table threads(
  id serial,
  is_open boolean,

  created_at timestamp,
  updated_at timestamp,
  primary key(id)
);

create table posts(
  id serial,
  user_id integer,
  thread_id integer,
  image_id integer,
  answer varchar,

  created_at timestamp,
  updated_at timestamp,
  primary key(id),
  foreign key(user_id) references users(id),
  foreign key(thread_id) references threads(id),
  foreign key(image_id) references images(id)
);

create table comments(
  id serial,
  user_id integer,
  thread_id integer,
  comment varchar,

  created_at timestamp,
  updated_at timestamp,
  primary key(id),
  foreign key(user_id) references users(id),
  foreign key(thread_id) references threads(id)
);



-- \copy todofu from data/todofu.csv csv
