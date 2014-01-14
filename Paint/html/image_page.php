<?php 
	//set up image
	$height = 200;
	$width = 300;
	$im = imagecreatetruecolor($width, $height);
	$white = imagecolorallocate($im, 255, 255, 255);
	$blue = imagecolorallocate($im, 0, 0, 64);
	$dark = imagecolorallocate($im, 0, 0, 64);
	
	//draw on image
	imagefill($im,0,0,$white);
	imageline($im, 0, 0, $width, $height, $white);
	
	//output image
	Header ('Content-type: image/png');
	imagepng($im);
	
	//clean up
	imagedestroy($im);
?>