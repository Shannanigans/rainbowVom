    //RAINBOWVOM
    //Class declaration and constructor
    var RainbowVom = function (selector)
    {
        selector = selector;
        aIntervals = [];//array of intervals
        degreeIteration = 'random';//default random
        complimentaryColorRule = 'none';//default complimentary color rule
        oDeg = {deg: 135, degDest: 135, degInc: 1};
        iChangeInterval = 50;
        iColorIncremental = 1;
        iNumColors = 2;

        //default config object
        oColorDefault = {red: 255, green:255, blue:255};
        oColorDestDefault = {red: 255, green:255, blue:255};

        aCurrentColor = [];//To save current color variables

        //manage selector node options
        var els;
        if (typeof selector === 'string')
            els = document.querySelectorAll(selector);
        else if (selector.length)
            els = selector;
        else
            els = [selector];

        //create wrapped rainbowVom object
        for(var i = 0; i < els.length; i++ )
        {
            this[i] = els[i];
        }
        this.length = els.length;

    };

    RainbowVom.prototype.forEach = function (callback)
    {
        this.map(callback);
        return this;
    };

    RainbowVom.prototype.map = function (callback)
    {
        var results = [];
        for (var i = 0; i < this.length; i++)
        {
            results.push(callback.call(this, this[i], i));
        }
        return results;
    };

    RainbowVom.prototype.start = function ()
    {
        return this.forEach(
            function (el, i)
            {

                //if aCurrentColor is empty start with default config
                if(typeof(aCurrentColor[i]) === 'undefined')
                {
                    aCurrentColor[i] = {};
                    for (var j = 1; j <= iNumColors; j++)
                    {
                        aCurrentColor[i]["oColor"+j] = {red: oColorDefault.red, green: oColorDefault.green, blue : oColorDefault.blue};
                        aCurrentColor[i]["oColor"+j+"Dest"] = {red: oColorDestDefault.red, green: oColorDestDefault.green, blue : oColorDestDefault.blue};
                    }
                }

                aIntervals[i] = setInterval(function()
                {
                    //COLOR
                    switch(complimentaryColorRule)
                    {
                        case 'direct':
                            for (var j = 1; j <= iNumColors; j++)
                            {
                                if(j == 1)
                                {
                                    colourShift(aCurrentColor[i]['oColor'+j], aCurrentColor[i]['oColor'+j+'Dest'], iColorIncremental);
                                }
                                else
                                {
                                    aCurrentColor[i]['oColor'+j].red = 255 - aCurrentColor[i]['oColor'+(j - 1)].red;
                                    aCurrentColor[i]['oColor'+j].green = 255 - aCurrentColor[i]['oColor'+(j - 1)].green;
                                    aCurrentColor[i]['oColor'+j].blue = 255 - aCurrentColor[i]['oColor'+(j - 1)].blue;
                                }
                            }
                            break;
                        case 'none':
                        default:
                            //shift for each color
                            for (var j = 1; j <= iNumColors; j++)
                                colourShift(aCurrentColor[i]['oColor'+j], aCurrentColor[i]['oColor'+j+'Dest'], iColorIncremental);
                            break;
                    }

                    //DEGREE
                    switch(degreeIteration)
                    {
                        case 'static':
                            break;
                        case 'clockwise':
                            degShiftProg(oDeg, bClockwise = true);
                            break;
                        case 'anti-clockwise':
                            degShiftProg(oDeg, bClockwise = false);
                            break;
                        case 'random':
                        default:
                            degShiftRandom(oDeg);
                            break;
                    }

                    //CONSTRUCT COLOR STRING
                    var sColorString = '';
                    for (var j = 1; j <= iNumColors; j++)
                    {
                        sColorString += 'rgba('+aCurrentColor[i]['oColor'+j].red+','+aCurrentColor[i]['oColor'+j].green+','+aCurrentColor[i]['oColor'+j].blue+',1)';
                        if(j != iNumColors)
                            sColorString += ',';
                    }

                    //ADD TO CSS
                    el.style.cssText += 'background: linear-gradient('+oDeg.deg+'deg,'+sColorString+')';

                }, iChangeInterval);

                //COLOR SHIFT/RESET FUNCTION
                function colourShift(oColor, oColorDest, iColorIncremental)
                {
                    if(oColor.red == oColorDest.red && oColor.green == oColorDest.green && oColor.blue == oColorDest.blue)
                    {
                        for (var key in oColorDest)
                        {
                            if (oColorDest.hasOwnProperty(key))
                            {
                                 oColorDest[key] = Math.floor((Math.random() * 255) + 1);
                            }
                        }
                    }
                    else
                    {
                        if(oColor.red > oColorDest.red)
                            oColor.red = oColor.red - iColorIncremental;
                        else if(oColor.red < oColorDest.red)
                            oColor.red = oColor.red + iColorIncremental;

                        if(oColor.green > oColorDest.green)
                            oColor.green = oColor.green - iColorIncremental;
                        else if(oColor.green < oColorDest.green)
                            oColor.green = oColor.green + iColorIncremental;

                        if(oColor.blue > oColorDest.blue)
                            oColor.blue = oColor.blue - iColorIncremental;
                        else if(oColor.blue < oColorDest.blue)
                            oColor.blue = oColor.blue + iColorIncremental;
                    }
                }

                //DEGREE SHIFT RANDOM FUNCTION
                function degShiftRandom(oDeg)
                {
                    if(oDeg.deg == oDeg.degDest)
                    {
                        oDeg.degDest = Math.floor((Math.random() * 360) + 1);
                    }
                    else
                    {
                        if(oDeg.deg > oDeg.degDest)
                            oDeg.deg = oDeg.deg - oDeg.degInc;
                        else if(oDeg.deg < oDeg.degDest)
                            oDeg.deg = oDeg.deg + oDeg.degInc;
                    }
                }

                //DEGREE SHIFT PROGRESSIVE CLOCKWISE/ANTICLOCKWISE FUNCTION
                function degShiftProg(oDeg, bClockwise)
                {
                    if(bClockwise == true || bClockwise == 'undefined')
                    {
                        if(oDeg.deg >= 360)
                            oDeg.deg = 1;
                        else
                            oDeg.deg = oDeg.deg + oDeg.degInc;
                    }
                    else if(bClockwise == false)
                    {
                        if(oDeg.deg <= 1)
                            oDeg.deg = 360;
                        else
                            oDeg.deg = oDeg.deg - oDeg.degInc;
                    }
                }

            }
        );
    };

    RainbowVom.prototype.stop = function ()
    {
        return this.forEach(
            function (el, i)
            {
                clearInterval(aIntervals[i]);
            }
        );
    };

    RainbowVom.prototype.setDegreeIterationRule = function (sRule)
    {
        return this.forEach(
            function (el, i)
            {
                if(isVomRunning())
                {
                    this.stop();
                    degreeIteration = sRule;
                    this.start();
                }
                else
                    degreeIteration = sRule;
            }
        );
    };

    RainbowVom.prototype.setDegree = function (sValue)
    {
        return this.forEach(
            function (el, i)
            {
                if(isVomRunning())
                {
                    this.stop();
                    oDeg.deg = sValue;
                    this.start();
                }
                else
                {
                    oDeg.deg = sValue;
                }
            }
        );
    };

    RainbowVom.prototype.setComplimentaryColorRule = function (sRule)
    {
        return this.forEach(
            function (el, i)
            {
                if(isVomRunning())
                {
                    this.stop();
                    complimentaryColorRule = sRule;
                    this.start();
                }
                else
                {
                    complimentaryColorRule = sRule;
                }
            }
        );
    };

    RainbowVom.prototype.setNumColors = function (sValue)
    {
        return this.forEach(
            function (el, i)
            {
                if(isVomRunning())
                {
                    this.stop();
                    aCurrentColor = [];
                    iNumColors = sValue;
                    this.start();
                }
                else
                {
                    iNumColors = sValue;
                }
            }
        );
    };

    function isVomRunning()
    {
        if(aCurrentColor.length == 0)
            return false;
        else
            return true;
    }
