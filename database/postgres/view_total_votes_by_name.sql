create view total_votes_by_name as
select id as name_id,
  (select count(up) from votes where votes.name_id = names.id and up = true) as up,
  (select count(up) from votes where votes.name_id = names.id and up = false) as down
from names;
