const utilStyles = {
    width: "350px",
    maxWidth: "100%",
    margin: "35px auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    justifyContent: "center",
    alignItems: "center",
  };

const statistics = {
    display: "flex",
    gap: "30px",
    width: "350px",
    justifyContent: "center",
    alignItems: "center",
  };

const boardStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 100,
}

const gridStyle = {
  border: "4px solid darkblue",
  borderRadius: "10px",
  width: "350px",
  height: "350px",
  margin: "0 auto",
  display: "grid",
  gridTemplate: "repeat(3, 1fr) / repeat(3, 1fr)",
  marginTop: "75px",
}

const moveInfoStyle = {
  display: "inherit", 
  gap: 10, 
  flexWrap: "wrap", 
  alignItems: "center", 
  margin: "0 auto", 
  justifyContent: "center", 
  maxWidth: 1250, 
  width: "100%"
}

export {utilStyles, statistics, boardStyle, gridStyle, moveInfoStyle}