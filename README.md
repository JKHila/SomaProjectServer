# SomaProjectServer
클라우드는 aws서비스를 이용해서 우분투 서버를 운용했습니다.

Restful API형태로 설계하여 node.js로 백엔드 서버를 구현했습니다.

database는 mysql을 이용하였고 node.js와 연동해서 데이터를 저장했습니다.

table로는 user_table (nick_name,score,start_time,play_time,end_time)과

gcm서비스를 이용해서 푸쉬메세지를 보내기위한 registid(id)가 있습니다.

user_table의 score를 통해서 랭킹시스템을 구현했습니다.

구글플레이와 연동해서 로그인을 구현했습니다.
