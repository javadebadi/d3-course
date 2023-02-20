Note that svg path can be style with CSS stylesheet, attributes and inline style. For example, the `stroke` of path can be set in any of the three possibilities. The precedence of the stylings are as follows:
CSS stylesheet => attribute => inline css
For example
```javascript
.style("stroke", "green")
.attr("stroke", "blue")
```
will cause the path's `stroke` to be green even though the `stroke` attribute is set after the style.


# other d3 extensions
nvd3
crossfilter - dashboard
dc.js  - dashboard 
