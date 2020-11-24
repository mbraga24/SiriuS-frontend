export default dateRange => {
  let dateArray;
  let range = {
    dueDate: "",
    startDate: ""
  }

  if (dateRange !== "") {
    dateArray = dateRange.match(/.{1,12}/g)
    if (dateArray[1] !== " ") {
      range.startDate = dateArray[0].split(" ")[0].split("-").join("/")
      range.dueDate = dateArray[1].split(" ")[1].split("-").join("/")
    } else {
      range.startDate = ""
      range.dueDate = ""  
    }
  } else {
    range.startDate = ""
    range.dueDate = ""
  }

  return range
}