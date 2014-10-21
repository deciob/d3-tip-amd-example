define([
  "d3",
  "d3_tip",
  "data",
], function(d3, d3_tip, data) {
  
    var tip = d3_tip()
      .attr('class', 'd3-tip')
      .html(function(d) { return '<span>' + d.total + '</span>' + ' entries' })
      .offset([-12, 0])

    var w = 800,
        h = 300,
        padt = 20, padr = 20, padb = 60, padl = 30,
        x  = d3.scale.ordinal().rangeRoundBands([0, w - padl - padr], 0.1),
        y  = d3.scale.linear().range([h, 0]),
        yAxis = d3.svg.axis().scale(y).orient('left').tickSize(-w + padl + padr),
        xAxis = d3.svg.axis().scale(x).orient('bottom')

    vis = d3.select('#graph')
      .append('svg')
      .attr('width', w)
      .attr('height', h + padt + padb)
    .append('g')
      .attr('transform', 'translate(' + padl + ',' + padt + ')')

    var max = d3.max(data, function(d) { return d.total })
    x.domain(d3.range(data.length))
    y.domain([0, max])

    vis.call(tip)
    vis.append("g")
      .attr("class", "y axis")
      .call(yAxis)

    vis.append("g")
      .attr("class", "x axis")
      .attr('transform', 'translate(0,' + h + ')')
      .call(xAxis)
      .selectAll('.x.axis g')
        .style('display', function (d, i) { return i % 3 != 0  ? 'none' : 'block' })

    var bars = vis.selectAll('g.bar')
      .data(data)
    .enter().append('g')
      .attr('class', 'bar')
      .attr('transform', function (d, i) { return "translate(" + x(i) + ", 0)" })

    bars.append('rect')
      .attr('width', function() { return x.rangeBand() })
      .attr('height', function(d) { return h - y(d.total) })
      .attr('y', function(d) { return y(d.total) })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

});