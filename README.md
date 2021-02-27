# storken-broadcast

Broadcasts the effected states to other tabs.

When changed a state value in a tab and if there is another tab for the same site that contains the state then its value changes in all the tabs by this plugin.

# Installation
```sh
# yarn
yarn add storken-broadcast

# npm
npm install storken-broadcast
```

# Usage
```js
import { create as createStore } from 'storken'
import Broadcast from 'storken-broadcast'

const [useStorken] = createStore({
  plugins: {
    broadcast: Broadcast
  },
  storkenOptions: {
    tableData: {
      broadcast: true
    }
  }
})
```

# Options
Storage options should be passed in `storkenOptions` by key.

There is just one option for this plugin. Pass `true` for `broadcast` if you want to broadcast value of the state to all of the tabs when state is set.

`broadcast`: defaults to undefined, so, `false`.

# License
Distributed under the [MIT](/LICENSE) license.

# Contribute
You can contribute by fork this repositry and make pull request.

