export function saveStatePlugin(store) {
  store.subscribe(
    (mutation, state) => {
      localStorage.setItem(
        'board',
        JSON.stringify(state.board)
      )
    }
  )
}

export function uuid () {
  return Math.random().toString(16).slice(2)
}
