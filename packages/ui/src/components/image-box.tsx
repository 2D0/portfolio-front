'use client';
import { useEffect, useRef, useState } from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image, { type ImageProps } from 'next/image';
import { cn } from '@repo/commons/cn';
import { cva, type VariantProps } from 'class-variance-authority';
interface ImageBoxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof imageVariants> {
  imagePorps: Omit<ImageProps, 'onError' | 'src'> & {
    aspectSize?: { size: number };
    src?: string | null;
  };
  defaultSrc?: string | StaticImport;
}

const imageVariants = cva('relative overflow-hidden', {
  variants: {
    size: {
      full: 'w-full h-full',
    },
    color: {
      default: 'bg-gray',
      transparent: 'bg-transparent',
    },
    border: {
      default: 'border border-gray-300',
      primary: 'border border-primary',
      destructive: 'border border-destructive',
    },
    rounded: {
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full',
      none: 'rounded-none',
    },
  },
  defaultVariants: {
    color: 'default',
    rounded: 'lg',
  },
});

export const ImageBox = (props: ImageBoxProps) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const { imagePorps, defaultSrc, color, border, rounded, className, ...wrap } =
    props;
  const { src, width, height, aspectSize, ...image } = imagePorps || {};
  const defaultImage =
    defaultSrc ?? require('./../images/source/error-handle.svg');
  const [size, setSize] = useState({
    width: '5rem',
    height: '5rem',
    maxWidth: '5rem',
    maxHeight: '5rem',
  });
  const [imageSrc, setImageSrc] = useState<string | StaticImport>(
    src ?? defaultImage,
  );
  const [containerSize, setContainerSize] =
    useState<ImageProps['width']>(width);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (imageRef.current) {
      const imageWidth = imageRef.current.clientWidth;
      const imageHeight = imageRef.current.clientHeight;
      setContainerSize(imageWidth >= imageHeight ? imageHeight : imageWidth);
      setLoading(false);
    }
  }, [imageRef]);

  useEffect(() => {
    if (imageRef.current && aspectSize) {
      const img = new window.Image();
      img.src = src || '';
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        let width, height;

        if (img.width > img.height) {
          width = Math.min(img.width, aspectSize?.size);
          height = width / aspectRatio;
        } else {
          height = Math.min(img.height, aspectSize?.size);
          width = height * aspectRatio;
        }

        setSize({
          width: '100%',
          height: 'auto',
          maxWidth: `${width}px`,
          maxHeight: `${height}px`,
        });
        setLoading(false);
      };
    }
  }, [src, aspectSize]);

  return (
    <div
      ref={imageRef}
      {...wrap}
      className={cn([imageVariants({ color, border, rounded }), className])}
      style={
        aspectSize
          ? loading
            ? { width: '5rem', height: '5rem' }
            : { ...size }
          : {}
      }
    >
      {aspectSize ? (
        <>
          {loading && (
            <div className="flex justify-center items-center absolute inset-0">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
            </div>
          )}
          <Image
            {...image}
            src={imageSrc}
            onError={() => setImageSrc(defaultImage)}
            width={aspectSize?.size}
            height={aspectSize?.size}
            style={{
              objectFit: imageSrc === defaultImage ? 'scale-down' : 'cover',
              objectPosition: 'center',
              display: loading ? 'none' : 'block',
            }}
          />
        </>
      ) : (
        <Image
          {...image}
          src={imageSrc}
          onError={() => setImageSrc(defaultImage)}
          className={cn([
            imageSrc === defaultImage ? 'h-[50%]' : 'w-full',
            'h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          ])}
          width={imageSrc === defaultImage ? containerSize : width}
          height={imageSrc === defaultImage ? containerSize : height}
          style={{
            maxWidth: '100%',
            height: 'auto',
            objectFit: imageSrc === defaultImage ? 'scale-down' : 'cover',
            objectPosition: 'center',
          }}
        />
      )}
    </div>
  );
};
