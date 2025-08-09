## Components & Data

### `public/js/teamData.js`
- Exports `teamInfo` array containing team member metadata used by `aboutRouter`.
- Shape:
```js
[
  { id: number, name: string, role: string, bio: string, type: string }
]
```
- Usage:
```js
const teamInfo = require('../public/js/teamData');
res.render('member', { data: teamInfo[0], categories });
```