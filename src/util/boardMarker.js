function getMarker (chessBox, me) {
  let resultList = []
  let enemy = (me==1 ? 2: 1)
  for (let j=0; j<14; j++) {
    for (let i=0; i<14; i++) {
      if (chessBox[i][j] == me) {
        let result = getChessMarker(chessBox, i, j)
        if (result[0] > 0) {
          resultList.push(result)
        }
      }
      if (chessBox[i][j] == enemy) {
        let result = getChessMarker(chessBox, i, j)
        console.log(result)
        if (result[0] > 0) {
          resultList.push(result)
        }
      }
    }
  }
  let index = -1, marker = 0;
  console.log(resultList)
  for (let i = 0; i < resultList.length; i++) {
    if (resultList[i][0]>marker) {
      index = i
      marker = resultList[index][0]
    }
  }
  if (index != -1) {
    return [resultList[index][1], resultList[index][2]]
  }else {
    return [7, 7]
  }
}

function getChessMarker (chessBox, i, j) {
  let currentChess = chessBox[i][j]
  console.log(currentChess)
  let marker = 0
  let result = []
  let score = 0, condition, x, y
  if (i >= 4) {
    score = 10
    condition = ['l']
    for (x = i-1; x>=0; x--) {
      if (i-x >= 5) {
        break;
      }
      if (chessBox[x][j] == 0) {
        condition.push(chessBox[x][j])
        continue;
      }
      if (chessBox[x][j] != currentChess) {
        score = 0;
        break;
      }
      if (chessBox[x][j] == currentChess) {
        condition.push(chessBox[x][j])
        score *= score
      }
    }
    console.log(score)
  } else {
    score = 0
    condition = []
  }
  if (score > marker) {
    marker = score
    result = condition
  }
  if (i <= 10) {
    score = 10
    condition = ['r']
    for (x = i+1; x<=14; x++) {
      if (x-i >= 5) {
        break;
      }
      if (chessBox[x][j] == 0) {
        condition.push(chessBox[x][j])
        continue;
      }
      if (chessBox[x][j] != currentChess) {
        score = 0;
        break;
      }
      if (chessBox[x][j] == currentChess) {
        condition.push(chessBox[x][j])
        score *= score
      }
    }
  } else {
    score = 0
    condition = []
  }
  if (score > marker) {
    marker = score
    result = condition
  }
  if (j >= 4) {
    score = 10
    condition = ['u']
    for (y = j-1; y>=0; y--) {
      if (j-y >= 5) {
        break;
      }
      if (chessBox[i][y] == 0) {
        condition.push(chessBox[i][y])
        continue;
      }
      if (chessBox[i][y] != currentChess) {
        score = 0;
        break;
      }
      if (chessBox[i][y] == currentChess) {
        condition.push(chessBox[i][y])
        score *= score
      }
    }
  } else {
    score = 0
    condition = []
  }
  if (score > marker) {
    marker = score
    result = condition
  }
  if (j <= 10) {
    score = 10
    condition = ['d']
    for (y = j+1; y<=14; y++) {
      if (y-j >= 5) {
        break;
      }
      if (chessBox[i][y] == 0) {
        condition.push(chessBox[i][y])
        continue;
      }
      if (chessBox[i][y] != currentChess) {
        score = 0;
        break;
      }
      if (chessBox[i][y] == currentChess) {
        condition.push(chessBox[i][y])
        score *= score
      }
    }
  } else {
    score = 0
    condition = []
  }
  if (score > marker) {
    marker = score
    result = condition
  }
  if (j <= 10&&i <=10) {
    score = 10
    condition = ['dr']
    for (y = j+1, x=i+1; y<=14&&x<=14; y++, x++) {
      if (y-j >= 5 || x-i>=5) {
        break;
      }
      if (chessBox[x][y] == 0) {
        condition.push(chessBox[x][y])
        continue;
      }
      if (chessBox[x][y] != currentChess) {
        score = 0;
        break;
      }
      if (chessBox[x][y] == currentChess) {
        condition.push(chessBox[x][y])
        score *= score
      }
    }
  } else {
    score = 0
    condition = []
  }
  if (score > marker) {
    marker = score
    result = condition
  }
  if (j >= 4&&i >=4) {
    score = 10
    condition = ['ul']
    for (y = j-1, x=i-1; y>=0&&x>=0; y--, x--) {
      if (j-y >= 5 || i-x>=5) {
        break;
      }
      if (chessBox[x][y] == 0) {
        condition.push(chessBox[x][y])
        continue;
      }
      if (chessBox[x][y] != currentChess) {
        score = 0;
        break;
      }
      if (chessBox[x][y] == currentChess) {
        condition.push(chessBox[x][y])
        score *= score
      }
    }
  } else {
    score = 0
    condition = []
  }
  if (score > marker) {
    marker = score
    result = condition
  }
  if (j <= 10&&i >=4) {
    score = 10
    condition = ['dl']
    for (y = j+1, x=i-1; y<=14&&x>=0; y++, x--) {
      if (y-j >= 5 || i-x>=5) {
        break;
      }
      if (chessBox[x][y] == 0) {
        condition.push(chessBox[x][y])
        continue;
      }
      if (chessBox[x][y] != currentChess) {
        score = 0;
        break;
      }
      if (chessBox[x][y] == currentChess) {
        condition.push(chessBox[x][y])
        score *= score
      }
    }
  } else {
    score = 0
    condition = []
  }
  if (score > marker) {
    marker = score
    result = condition
  }
  if (j >= 4&&i <=10) {
    score = 10
    condition = ['ur']
    for (y = j-1, x=i+1; y>=0&&x<=14; y--, x++) {
      if (j-y >= 5 || x-i>=5) {
        break;
      }
      if (chessBox[x][y] == 0) {
        condition.push(chessBox[x][y])
        continue;
      }
      if (chessBox[x][y] != currentChess) {
        score = 0;
        break;
      }
      if (chessBox[x][y] == currentChess) {
        condition.push(chessBox[x][y])
        score *= score
      }
    }
  } else {
    score = 0
    condition = []
  }
  if (score > marker) {
    marker = score
    result = condition
  }
  console.log(result, result.length)
  if (result.length != 0) {
    let index
    for (index = 1;index < result.length; index++) {
      if (result[index] == 0) {
        break;
      }
    }
    if (result[0] == 'u') {
      return [marker, i, j-index]
    }
    if (result[0] == 'd') {
      return [marker, i, j+index]
    }
    if (result[0] == 'l') {
      return [marker, i-index, j]
    }
    if (result[0] == 'r') {
      return [marker, i+index, j]
    }
    if (result[0] == 'dr') {
      return [marker, i+index, j+index]
    }
    if (result[0] == 'dl') {
      return [marker, i-index, j+index]
    }
    if (result[0] == 'ur') {
      return [marker, i+index, j-index]
    }
    if (result[0] == 'ul') {
      return [marker, i-index, j-index]
    }
  }else {
    return [-1, -1, -1]
  }
}

export default getMarker
