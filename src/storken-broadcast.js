export const StorkenBroadcast = (storken) => {
  const { namespace, key, broadcast } = storken.opts

  if (!broadcast || !BroadcastChannel) {
    return
  }

  storken.channel = new BroadcastChannel(namespace + key)

  storken.channel.addEventListener('message', debounce(e => {
    if (!e.data || e.data.id === storken.id) {
      return
    }
    // Avoids "object cannot be cloned" error.
    const newValue = typeof e.data.message === 'object'
      ? JSON.parse(JSON.stringify(e.data.message))
      : e.data.message

    storken.set(newValue, { broadcast: false })
  }, 200))

  storken.addEventListener('set', (val, args, opts) => {
    Object.assign({ broadcast: true, force: false }, opts)
    if (storken.channel && opts.broadcast && broadcast) {
      storken.channel.postMessage({
        id: storken.id,
        message: val,
        disableSetter: !!opts.disableSetter
      })
    }
  })
}

export default StorkenBroadcast
