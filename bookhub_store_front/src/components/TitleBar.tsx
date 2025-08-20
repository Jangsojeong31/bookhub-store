import React from 'react'

function TitleBar(props: { title: string, children: React.ReactNode }) {
  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <div style={{ borderBottom: "2px solid #ccc", width: "100%", height: 50, padding: 0}}>
        <h2 style={{ margin: "10px auto", color: "#888686ff"}}>
        {props.title}
        </h2>
      </div>
      <div>
        {props.children}
      </div>
    </div>
  )
}

export default TitleBar