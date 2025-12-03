const HeaderBox = ({type="title", title, user, subtext}:HeaderBoxProps) => {
  return (
    <div className="header-box">
        <h1 className="header-box-title">
            {title}
            {type === "greeting" && (
                <span className="text-bankgradient">
                &nbsp;{user}</span>
            )}
            </h1>
    </div>
  )
}

export default HeaderBox