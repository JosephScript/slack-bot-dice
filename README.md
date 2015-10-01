# slack-bot-dice
A simple NodeJS bot for Slack channels. It will roll dice when told to. Easy as that.

Add this bot to your Slack channel and it will listen for the "roll" keyword. Then, if you write `ndX+Y` (where n is the number of dice, X is the number of sides, and Y is the number you are adding to the result), it will roll it and display the calculated result.

## Features:

### Any die size is accepted. 

From 1d0 to 1d9007199254740991 (which is max [integer](http://ecma262-5.com/ELS5_HTML.htm#Section_8.5)).

### Any number of dice are accepted

From 1dX to 9007199254740991dX.

### No number of dice defaults to one. 

For example, `roll d6` will roll one d6 die.

### Addition. 
```
1d20+4
```

### Subtraction. 
```
1d20-4
```

### You can chain multiple dice together. 
```
1d20+1d6+4
```

### Detailed output:
```
roll detail 2d6+4-2
```
Would output:
```
Input:roll 2d6+4-2
Parsing 2d6
  From roll d6, roll 1 was 4. Total: 4
  From roll d6, roll 2 was 3. Total: 7
Parsing 4-2
  Bonus: 4
Parsing 4
  Bonus: 4
Parsing 2
  Bonus: 2
Total: 15 - 2 = 13
```

## The MIT License

Copyright (c) 2015 Joseph Szczesniak. 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
