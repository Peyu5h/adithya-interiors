import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { ExternalLink, Navigation, ZoomIn, ZoomOut } from "lucide-react";

export interface MapProps {
  latitude: number;
  longitude: number;
  title?: string;
  address?: string;
  showZoomControls?: boolean;
  showDirections?: boolean;
  height?: string;
  width?: string;
  className?: string;
}

export const MapTemp = ({
  latitude,
  longitude,
  title,
  address,
  showZoomControls = false,
  showDirections = false,
  height = "300px",
  width = "100%",
  className = "",
}: MapProps) => {
  const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  return (
    <div
      className={`relative overflow-hidden rounded-md border ${className}`}
      style={{ height, width }}
    >
      <div className="bg-muted absolute inset-0">
        <iframe
          title={title || "Property Location"}
          width="100%"
          height="100%"
          src={mapUrl}
          className="absolute inset-0"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>

      {(title || address) && (
        <div className="bg-background/80 absolute top-2 right-14 left-2 max-w-[70%] rounded-md p-2 backdrop-blur-sm">
          {title && <p className="line-clamp-1 text-sm font-medium">{title}</p>}
          {address && (
            <p className="text-muted-foreground line-clamp-1 text-xs">
              {address}
            </p>
          )}
        </div>
      )}

      <div className="absolute right-2 bottom-2 flex flex-col gap-2">
        <Badge className="bg-background/80 text-primary backdrop-blur-sm">
          {latitude.toFixed(6)}, {longitude.toFixed(6)}
        </Badge>

        {showDirections && (
          <Button
            size="sm"
            variant="secondary"
            className="bg-muted h-8 px-2 backdrop-blur-sm"
            onClick={() => window.open(directionsUrl, "_blank")}
          >
            <Navigation className="mr-1 h-4 w-4" />
            <span className="text-xs">Directions</span>
          </Button>
        )}
      </div>

      {showZoomControls && (
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          <Button
            size="sm"
            variant="secondary"
            className="bg-background/80 h-8 w-8 p-0 backdrop-blur-sm"
            onClick={() => {
              const iframe = document.querySelector("iframe");
              if (iframe && iframe.contentWindow) {
                iframe.contentWindow.postMessage("zoomIn", "*");
              }
            }}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="bg-background/80 h-8 w-8 p-0 backdrop-blur-sm"
            onClick={() => {
              const iframe = document.querySelector("iframe");
              if (iframe && iframe.contentWindow) {
                iframe.contentWindow.postMessage("zoomOut", "*");
              }
            }}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="bg-background/80 h-8 w-8 p-0 backdrop-blur-sm"
            onClick={() =>
              window.open(
                `https://www.google.com/maps?q=${latitude},${longitude}`,
                "_blank",
              )
            }
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
