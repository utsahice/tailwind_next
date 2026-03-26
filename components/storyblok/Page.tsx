import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";

interface PageProps {
    blok: {
        body?: any[];
        _uid: string;
        component: string;
    };
}

export default function Page({ blok }: PageProps) {
    return (
        <div {...storyblokEditable(blok)} className="w-full">
            {blok.body?.map((nestedBlok) => (
                <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))}
        </div>
    );
}