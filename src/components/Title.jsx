function Title ({ playerScore, computerScore }) {
  return(
    <>
      {playerScore === 9999 && <h5>w1nner w1nner ch1cken dinner</h5>}
      {computerScore === 9999 && <h5>loser loser drunken b00zer</h5>}
    </>
  )
}

export default Title;