"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { useAtom } from "jotai";
import { activeTagsAtom } from "../providers/atom";

export function BreadCrumb({ category }: { category: string }) {
  const { id } = useParams();

  const overFlowId =
    id?.length && id?.length > 24 ? id?.slice(0, 24) + "..." : id;

  const [activeTags, setActiveTags] = useAtom(activeTagsAtom);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink className="text-gray-500">
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink className="text-gray-500">
            <Link onClick={() => setActiveTags([])} href="/blog">
              Blog
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="text-gray-500">
              <Link onClick={() => setActiveTags([category])} href="/blog">
                {category || "...."}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage className="pointer-events-none">
            {overFlowId}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
