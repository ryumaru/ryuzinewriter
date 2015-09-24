RYUZINE WRITER SIMULATOR DEVICE SKINS
=====================================

You can make your own custom skins for the Ryuzine Writer Device Simulator for testing your Ryuzine publications (or you can load any URL into the Simulator to test the responsive layout of other pages as well).

The first thing you need to know about the Simulator is that it obviously cannot duplicate the functions of the actual operating system of the target device.  It does, however, try to show the screen space taken up by operating system elements and browser “chrome” around a web page (when using “Browser View” in the Simulator).

The most important thing to know is that the size of the simulated screen is the *RENDERED* size as it appears on the device, and NOT the actual pixel size of the device screen!

Many screens these days have high-density displays with large pixel counts, but the actual pixel dimensions of the screen are not what we need.  We need the “device independent pixel” (dip) number, which is a virtual pixel size after the image has been scaled for the high-density display.

For example, on an iPhone 5 the actual pixel size of the screen is 1136 x 640 with 326 pixels per inch (ppi).  But the screen density used for scaling is 2.0, which means it scales everything up by 2x.  Therefore the RENDERED screen size is 568 x 320.  For the Ryuzine Device Simulator we’re only interested in that rendered size.

Another example would be the HTC One phone, which has a screen with the actual pixel size of 1920 x 1080, but the rendered screen size is 640 x 360.

Inside the /ryuzinewriter/skins/ folder (where you found this file) is an HTML page titled “screensize.htm” which you can load into target devices in order to easily find out what the rendered values are.  The top number is the rendered screen size as reported by the device’s operating system.  The second number is the browser window size, minus any operating system elements or browser frames or tools.  If you need to also figure out the size of those elements knowing the difference is useful.  However, if the device is running a common operating system (like iOS, Android, or Windows Phone) the sizes of those elements are already calculated and included in the “os.css” skins file, so you really only need to know the device’s rendered screen size, not the browser’s.

To create the actual skin you’ll need an image of the device you can scale in photo editing software until the screen of the image is the same as the rendered screen size values you retrieved from the actual device.

To check that you got the correct values you can also open the utility file within the Ryuzine Writer Simulator.  So select your custom device from the drop-down list, then click the “Load URL” button and enter the path to the “screensize.htm” file.  You should see the same numbers as you saw on the actual device.

Operating System Skins
======================
In order to properly simulate the available screen size on most devices the browser “chrome” and operating system elements like status bars and tab bars need to be taken into account.  The size of these OS elements is what is important, but you can also “skin” them with images for a more realistic appearance.  Ideally these operating system layouts and skin images should go in the “/skins/os/“ sub-folder, but you could also include them with a custom device skin (keeping in mind that won’t make the OS skin available to other simulated device profiles).

The general method is to enable all the possible elements and take a screenshot on the device or in a simulator.  Even though default settings on a given device may not show, say a “Bookmarks Bar,” you should enable it and any other controls as well. Then, using image editing software, cut out the OS elements from the screenshot and then slice the images for each element into:

left, right, center (if applicable), and background

Doing it this way will make the OS skin independent of the WIDTH of the simulated device, and if done correctly will contract and stretch to fill the virtual screen.

The best way to see how this is accomplished is to look at the existing OS skins.  Note that they each also have a “layout.css” file in them, which defines the different appearances of OS elements on phones or tablets.

Then the “os.css” file simply uses @import to pull those layout.css files into itself.

