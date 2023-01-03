import { con } from '../index';


//회원가입 정보 입력 
exports.insert = ( data, cb ) => {
    const sql = `INSERT INTO user VALUES 
    ('${data.id}', '${data.user_password}', '${data.user_nickname}', '${data.user_accountAddress}', '${user_profileImg}' )`

    con.query(sql, (err, rows)=> { // DB에 저장
        if(err) throw err;
        cb( data.id, data.user_nickname, data.user_password, data.user_accountAddress, data.user_profileImg );
    });
}

// 로그인 정보 읽기 DB에 있는지 없는지 확인
exports.select = ( id, user_nickname, user_accountAddress, cb) => {
    const sql =`SELECT * FROM user WHERE id='${id} AND
                user_nickname='${user_nickname} AND
                user_accountAddress='${user_accountAddress}
                limit 1`; // 중복 id X 
                
    con.query(sql, (err, rows) => {
        if (err) throw err;
        cb( rows[0] );
    });
}