# rainbowVom
Transitional linear gradients

<a href="http://shannanigans.github.io/rainbowVom/">DEMO</a>

Example HTML<br>
<code>&lt;div class="rainbow"&gt;Rainbow Vom&lt;/div&gt;</code>

Instantiate a <strong>new Rainbow Vom object</strong> in javascript.<br>
<code>var oRainbowVom = new RainbowVom('.rainbow');</code>

Call the <strong>start</strong> method to start the linear gradient transitions.<br>
<code>oRainbowVom.start();</code>

Call the <strong>stop</strong> method to stop the linear gradient transitions.<br>
<code>oRainbowVom.stop();</code>

Call the <strong>setDegreeIterationRule</strong> method to set the rule for degree iteration.<br>
<code>oRainbowVom.setDegreeIterationRule('static');</code><br>
Options include:<br>
'random' (Default)<br>
'static'<br>
'clockwise'<br>
'anti-clockwise'<br>

Call the <strong>setDegree</strong> method to set the linear gradient degree.<br>
<code>oRainbowVom.setDegree('180');</code>
  
Call the <strong>setComplimentaryColorRule</strong> method to set the complimentary colour rule.<br>
<code>oRainbowVom.setComplimentaryColorRule('direct');</code><br>
Options include:<br>
'none' (Default)<br>
'direct'<br>

Call the <strong>setNumColors</strong> method to set the number of colours in the linear gradient.<br>
<code>oRainbowVom.setNumColors('3');</code>

