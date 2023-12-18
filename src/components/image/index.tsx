import React, { useEffect, useState } from 'react'

export type CountryImageProps = React.ImgHTMLAttributes<HTMLInputElement> & { countryCode: string }

const DEFAULT_IMAGE_SRC = '/Flags_with_Saltires.svg';

const CountryImage: React.FC<CountryImageProps> = ({ countryCode }) => {

  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    if(countryCode) {
      const image = new Image();

      const imageUrl = `https://flagsapi.com/${countryCode}/flat/64.png`

      image.src = imageUrl;

      image.onload = () => {
        setImageSrc(imageUrl)
      }

      image.onerror = () => {
        setImageSrc(DEFAULT_IMAGE_SRC)
      }
    }
  }, [countryCode]);

  return (
    <img src={imageSrc} />
  )
}

export default CountryImage