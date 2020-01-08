#!/usr/bin/env node

import getApp from '../index';

const port = process.env.PORT || 5000;

const app = getApp();

app.listen(port, () => {
  console.log(`Server was started on ${port}`);
});
