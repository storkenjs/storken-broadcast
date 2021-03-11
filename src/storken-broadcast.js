const debounce = (func, delay = 100) => {
  let timeout
  return (...args) => {
    const context = this
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(context, args), delay)
  }
}

const StorkenBroadcast = (storken) => {
  const { namespace, key, id } = storken
  const { broadcast } = storken.opts

  if (!broadcast || !BroadcastChannel) {
    return
  }

  storken.channel = new BroadcastChannel(namespace + key)

  storken.channel.addEventListener('message', debounce(e => {
    if (!e.data || e.data.id === id) {
      return
    }

    // Avoids "object cannot be cloned" error.
    const newValue = typeof e.data.message === 'object'
      ? JSON.parse(JSON.stringify(e.data.message))
      : e.data.message

    storken.set(newValue, { broadcast: false })
  }, 200))

  storken.addEventListener('set', (val, args, opts) => {
    opts = Object.assign({ broadcast: true, force: false }, opts)
    if (storken.channel && broadcast && opts.broadcast) {
      storken.channel.postMessage({
        id,
        message: val,
        disableSetter: !!opts.disableSetter
      })
    }
  })
}

export default StorkenBroadcast
