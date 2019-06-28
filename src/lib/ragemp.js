/* globals mp */
function getRemote () {
  if (typeof mp === 'undefined') {
    return {
      trigger (event, ...args) {
        console.log('mp.trigger: ', event, ...args)
      },

      invoke (event, arg) {
        console.log('mp.invoke', event, arg)
      }
    }
  }

  return mp
}

function getUrl (name) {
  if (typeof mp === 'undefined') {
    return `./assets/${name}.webp`
  }

  return `package://dayrp-data/${name}.webp`
}

export default {
  mp: getRemote(),
  getUrl
}
