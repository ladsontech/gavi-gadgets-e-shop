
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

interface Update {
  id: string;
  title: string;
  image_url: string;
  display_order: number;
  created_at: string;
}

export const UpdatesCarousel = () => {
  const [api, setApi] = useState<any>();

  const autoplay = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const { data: updates, isLoading } = useQuery({
    queryKey: ['updates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('updates')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Update[];
    },
  });

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      // Auto-restart autoplay after manual navigation
      if (autoplay.current) {
        autoplay.current.reset();
      }
    });
  }, [api]);

  if (isLoading || !updates || updates.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-pink-50 py-4 sm:py-6 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-lg sm:text-xl font-bold text-pink-700 mb-3 sm:mb-4 px-1">
          Latest Updates
        </h2>
        
        <Carousel
          setApi={setApi}
          className="w-full"
          plugins={[autoplay.current]}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-2 sm:-ml-4">
            {updates.map((update) => (
              <CarouselItem 
                key={update.id} 
                className="pl-2 sm:pl-4 basis-full sm:basis-4/5 md:basis-3/5 lg:basis-1/2 xl:basis-2/5"
              >
                <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="aspect-[16/9] relative overflow-hidden bg-gray-100">
                      <img
                        src={update.image_url}
                        alt={update.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Navigation arrows - hidden on mobile, visible on larger screens */}
          <div className="hidden sm:block">
            <CarouselPrevious className="left-2 bg-white/80 hover:bg-white border-pink-200 text-pink-600 hover:text-pink-700" />
            <CarouselNext className="right-2 bg-white/80 hover:bg-white border-pink-200 text-pink-600 hover:text-pink-700" />
          </div>
        </Carousel>
        
        {/* Dots indicator for mobile */}
        <div className="flex justify-center mt-3 sm:hidden">
          <div className="flex space-x-1">
            {updates.map((_, index) => (
              <button
                key={index}
                className="w-2 h-2 rounded-full bg-pink-300 hover:bg-pink-500 transition-colors"
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
