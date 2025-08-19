import React, { useEffect, useState } from 'react'

function UpdateNickname() {
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const fetchNickname = async () => {

    }

    fetchNickname();
  }, []);

  const onUpdateNickname = () => {

  }

  return (
    <div>
      <p>
      닉네임 : 
      <input 
      type='text'
      value={nickname}
      onChange={(e) => setNickname(e.target.value)}
      placeholder='변경할 닉네임을 입력해주세요'>
      </input>
      </p>
      <button onClick={onUpdateNickname}>저장</button>
    </div>
  )
}

export default UpdateNickname