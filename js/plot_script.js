var PlotApp = function(){

    var handleDashFlotCharts = function () {
        function chartMonth() { 
            var data1 = [[0, 1.5],[1, 2], [2, 1], [3, 1.5], [4, 2.5],[5, 2], [6, 2], [7, 0.5], [8, 1], [9, 1.5], [10, 2],[11, 2.5], [12, 2], [13, 1.5], [14, 2.8], [15, 2],[16, 3], [17, 2], [18, 2.5], [19, 3],[20, 2.5], [21, 2], [22, 1.5], [23, 2.5], [24, 2], [25, 1.5],[26, 1], [27, 0.5], [28, 1], [29, 1],[30, 1.5], [31, 1]];
            var data2 = [[0, 2.5],[1, 3.5], [2, 2], [3, 3], [4, 4],[5, 3.5], [6, 3.5], [7, 1], [8, 2], [9, 3], [10, 4],[11, 5], [12, 4], [13, 3], [14, 5], [15, 3.5],[16, 5], [17, 4], [18, 5], [19, 6],[20, 5], [21, 4], [22, 3], [23, 5], [24, 4], [25, 3],[26, 2], [27, 1], [28, 2], [29, 2],[30, 3], [31, 2]];
            
            var plot = $.plot($("#chart-dash"), [{
                data: data2,
                label: "Pageviews",
                bars: {
                    show: true,
                    fill: true,
                    barWidth: 0.4,
                    align: "center",
                    lineWidth: 13
                }
            }, {
                data: data1,
                label: "Visits",
                lines: {
                    show: true,
                    lineWidth: 2
                },
                points: {
                    show: true,
                    lineWidth: 2,
                    fill: true
                },
                shadowSize: 0
            }, {
                data: data1,
                label: "Visits",
                lines: {
                    show: true,
                    lineWidth: 1,
                    fill: true,
                    fillColor: {
                        colors: [{
                                opacity: 0.05
                            }, {
                                opacity: 0.01
                            }
                        ]
                    }
                },
                points: {
                    show: true,
                    lineWidth: 0.5,
                    fill: true
                },
                shadowSize: 0
            }], {
                grid: {
                    hoverable: true,
                    clickable: true,
                    tickColor: "#f7f7f7",
                    borderWidth: 0,
                    labelMargin: 10,
                    margin: {
                        top: 0,
                        left: 5,
                        bottom: 0,
                        right: 0
                    }
                },
                legend: {
                    show: false
                },
                colors: ["rgba(109,173,189,0.5)", "#70AFC4", "#DB5E8C"],
                
                xaxis: {
                    ticks: 5,
                    tickDecimals: 0,
                    tickColor: "#fff"
                },
                yaxis: {
                    ticks: 3,
                    tickDecimals: 0
                },
            });
            function showTooltip(x, y, contents) {
                    $('<div id="tooltip">' + contents + '</div>').css({
                            position: 'absolute',
                            display: 'none',
                            top: y + 5,
                            left: x + 15,
                            border: '1px solid #333',
                            padding: '4px',
                            color: '#fff',
                            'border-radius': '3px',
                            'background-color': '#333',
                            opacity: 0.80
                        }).appendTo("body").fadeIn(200);
                }
            var previousPoint = null;
            $("#chart-dash").bind("plothover", function (event, pos, item) {
                $("#x").text(pos.x.toFixed(2));
                $("#y").text(pos.y.toFixed(2));
                if (item) {
                    if (previousPoint != item.dataIndex) {
                        previousPoint = item.dataIndex;
                        $("#tooltip").remove();
                        var x = item.datapoint[0].toFixed(2),
                            y = item.datapoint[1].toFixed(2);
                        showTooltip(item.pageX, item.pageY,
                            item.series.label + " of " + x + " = " + y);
                    }
                } else {
                    $("#tooltip").remove();
                    previousPoint = null;
                }
            });
        }
        
        //Select chart
        function chart_select() {
                // setup plot
                function getData(x1, x2) {

                    var d = [];
                    for (var i = 0; i <= 100; ++i) {
                        var x = x1 + i * (x2 - x1) / 100;
                        d.push([x, Math.cos(x * Math.sin(x))]);
                    }

                    return [
                        { label: "cos(x sin(x))", data: d }
                    ];
                }

                var options = {
                    grid: {
                        hoverable: true,
                        clickable: true,
                        tickColor: "#f7f7f7",
                        borderWidth: 0,
                        labelMargin: 10,
                        margin: {
                            top: 0,
                            left: 5,
                            bottom: 0,
                            right: 0
                        }
                    },
                    legend: {
                        show: false
                    },
                    series: {
                        lines: {
                            show: true
                        },
                        shadowSize: 0,
                        points: {
                            show: true
                        }
                    },
                    colors: ["#D9534F"],
                    yaxis: {
                        ticks: 10
                    },
                    selection: {
                        mode: "xy",
                        color: "#F1ADAC"
                    }
                };

                var startData = getData(0, 3 * Math.PI);

                var plot = $.plot("#placeholder", startData, options);

                // Create the overview plot

                var overview = $.plot($("#overview"), startData, {
                    legend: {
                        show: false
                    },
                    series: {
                        lines: {
                            show: true,
                            lineWidth: 1
                        },
                        shadowSize: 0
                    },
                    xaxis: {
                        ticks: 4
                    },
                    yaxis: {
                        ticks: 3,
                        min: -2,
                        max: 2
                    },
                    colors: ["#D9534F"],
                    grid: {
                        color: "#999",
                        borderWidth: 0,
                    },
                    selection: {
                        mode: "xy",
                        color: "#F1ADAC"
                    }
                });

                // now connect the two

                $("#placeholder").bind("plotselected", function (event, ranges) {

                    // clamp the zooming to prevent eternal zoom

                    if (ranges.xaxis.to - ranges.xaxis.from < 0.00001) {
                        ranges.xaxis.to = ranges.xaxis.from + 0.00001;
                    }

                    if (ranges.yaxis.to - ranges.yaxis.from < 0.00001) {
                        ranges.yaxis.to = ranges.yaxis.from + 0.00001;
                    }

                    // do the zooming

                    plot = $.plot("#placeholder", getData(ranges.xaxis.from, ranges.xaxis.to),
                        $.extend(true, {}, options, {
                            xaxis: { min: ranges.xaxis.from, max: ranges.xaxis.to },
                            yaxis: { min: ranges.yaxis.from, max: ranges.yaxis.to }
                        })
                    );

                    // don't fire event on the overview to prevent eternal loop

                    overview.setSelection(ranges, true);
                });

                $("#overview").bind("plotselected", function (event, ranges) {
                    plot.setSelection(ranges);
                });

                // Add the Flot version string to the footer

                $("#footer").prepend("Flot " + $.plot.version + " &ndash; ");

        }
        
        //Revenue chart
        function chart_revenue() {
            var likes = [[1, Math.random()*100], [2, Math.random()*100], [3, Math.random()*100], [4, Math.random()*100],[5,Math.random()*100],[6, Math.random()*100],[7, Math.random()*100],[8, Math.random()*100],[9, Math.random()*100],[10, Math.random()*100],[11, Math.random()*100],[12, Math.random()*100]];
        
            var chartColor = $(this).parent().parent().css("color");
            
            var plot = $.plot($("#chart-revenue"),
                   [ { data: likes} ], {
                       series: {
                           label: "Revenue",
                           lines: { 
                                show: true,
                                lineWidth: 3, 
                                fill: false
                           },
                           points: { 
                                show: true, 
                                lineWidth: 3,
                                fill: true,
                                fillColor: chartColor 
                           },   
                           shadowSize: 0
                       },
                       grid: { hoverable: true, 
                               clickable: true, 
                               tickColor: "rgba(255,255,255,.15)",
                               borderColor: "rgba(255,255,255,0)"
                             },
                       colors: ["#fff"],
                       xaxis: {
                            font: {
                                color: "#fff"
                            },
                            ticks:6, 
                            tickDecimals: 0, 
                            tickColor: chartColor,
                       },
                       yaxis: {
                            font: {
                                color: "#fff"
                            },
                            ticks:4, 
                            tickDecimals: 0,
                            autoscaleMargin: 0.000001
                       },
                       legend: {
                            show: false
                       }
                     });

            function showTooltip(x, y, contents) {
                $('<div id="tooltip">' + contents + '</div>').css( {
                    position: 'absolute',
                    display: 'none',
                    top: y + 5,
                    left: x + 5,
                    border: '1px solid #fdd',
                    padding: '2px',
                    'background-color': '#dfeffc',
                    opacity: 0.80
                }).appendTo("body").fadeIn(200);
            }

            var previousPoint = null;
            $("#chart-revenue").bind("plothover", function (event, pos, item) {
                $("#x").text(pos.x.toFixed(2));
                $("#y").text(pos.y.toFixed(2));

                    if (item) {
                        if (previousPoint != item.dataIndex) {
                            previousPoint = item.dataIndex;

                            $("#tooltip").remove();
                            var x = item.datapoint[0].toFixed(2),
                                y = item.datapoint[1].toFixed(2);

                            showTooltip(item.pageX, item.pageY,
                                        item.series.label + " on " + x + " = " + y);
                        }
                    }
                    else {
                        $("#tooltip").remove();
                        previousPoint = null;
                    }
            });
        }
        
        //Run the charts
        chartMonth();
        chart_select();
        chart_revenue();
        
        //Pie 1
        $('#dash_pie_1').easyPieChart({
            easing: 'easeOutBounce',
            onStep: function(from, to, percent) {
                $(this.el).find('.percent').text(Math.round(percent)+"%");
            },
            lineWidth: 6,
            barColor: Theme.colors.purple
        });
        var chart1 = window.chart = $('#dash_pie_1').data('easyPieChart');
        //Pie 2
        $('#dash_pie_2').easyPieChart({
            easing: 'easeOutBounce',
            onStep: function(from, to, percent) {
                $(this.el).find('.percent').text(Math.round(percent)+"%");
            },
            lineWidth: 6,
            barColor: Theme.colors.yellow
        });
        var chart2 = window.chart = $('#dash_pie_2').data('easyPieChart');
        //Pie 3
        $('#dash_pie_3').easyPieChart({
            easing: 'easeOutBounce',
            onStep: function(from, to, percent) {
                $(this.el).find('.percent').text(Math.round(percent)+"%");
            },
            lineWidth: 6,
            barColor: Theme.colors.pink
        });
        var chart3 = window.chart = $('#dash_pie_3').data('easyPieChart');
        
        //Update the charts
        $('.js_update').on('click', function() {
            chart1.update(Math.random()*100);
            chart2.update(Math.random()*100);
            chart3.update(Math.random()*100);
            chart_revenue();
        });
    }    
    return {
        init: function(){
            handleDashFlotCharts();
        }
    };
}();