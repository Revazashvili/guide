import h, { JSX } from "vhtml";
// @ts-ignore
import ConsistentHash from "consistent-hash";
import { Resource } from "../../src/ResourceModels";
import { Topic } from "../references/topic/TopicModels";
import TopicTag from "../references/topic/TopicTag.11ty";
import { AuthorFrontmatter } from "../references/author/AuthorModels";

const glowColorHashRing = new ConsistentHash({ range: 100003, weight: 80, distribution: "uniform" });
glowColorHashRing.add('has-glow-magenta');
glowColorHashRing.add('has-glow-pink');
glowColorHashRing.add('has-glow-fresh-green');
glowColorHashRing.add('has-glow-cold-green');
glowColorHashRing.add('has-glow-orange');
glowColorHashRing.add('has-glow-red');
glowColorHashRing.add('has-glow-purple');

export enum ResourceCardOrientation {
  Portrait = 0,
  Landscape = 1,
}

export type ResourceCardProps = {
  resource: Resource;
  orientation?: ResourceCardOrientation;
};

export const AuthorIcon = (author: AuthorFrontmatter) => (
  <img
    src={author.thumbnail}
    alt={author.title}
    // @ts-ignore
    loading="lazy"
    className="avatar"
  />
);

const ResourceCard = ({
  resource: { url, title, displayDate, subtitle, thumbnail, references },
  orientation,
}: ResourceCardProps): JSX.Element => {
  // @ts-ignore
  const { author, topics } = references;

  if (orientation == null || orientation == ResourceCardOrientation.Portrait) {
    const glowCssClass = glowColorHashRing.get(title);

    return (
      <div class="column is-half-tablet is-one-third-desktop">
        <div class="card is-equal-height">
          <div class="card-image">
            <a href={url}>
              <figure class={`image is-16by9 is-contained ${glowCssClass}`}>
                <img src={thumbnail} alt={title} />
              </figure>
            </a>
          </div>
          <div class="card-content">
            <a class="title is-size-4" aria-label={`Resource`} href={url}>
              {title}
            </a>
            {subtitle && <div class="content mt-2">{subtitle}</div>}
          </div>
          <footer class="card-footer">
            <div class="container p-4">
              <div class="tags mb-2">
                {topics.map((topic: Topic) => (
                  <TopicTag topic={topic} />
                ))}
              </div>

              <div class="media author">
                <div class="p-2 media-left">
                  <a href={author.url}>
                    <figure class="image m-0 is-24x24">
                      <AuthorIcon {...author} />
                    </figure>
                  </a>
                </div>
                <div class="media-content">
                  <div class="content is-size-7">
                    <p class="m-0">
                      <a href={author.url}>{author.title}</a>
                    </p>
                    <time class="m-0 has-text-grey-dark" datetime={displayDate}>
                      {displayDate}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  } else {
    return (
      <div class="column is-12">
        <div class="card is-equal-height">
          <div class="card-content">
            <article class="media">
              <figure class="media-left m-0 mr-4 is-hidden-mobile is-contained image is-128x128">
                <a href={url}>
                  <img class="" src={thumbnail} alt={title} />
                </a>
              </figure>
              <div class="media-content">
                <a class="title is-size-4" aria-label={`Resource`} href={url}>
                  {title}
                </a>
                {subtitle && <div class="content mt-2">{subtitle}</div>}

                <footer>
                  <div>
                    <div class="tags mb-2">
                      {topics.map((topic: Topic) => (
                        <TopicTag topic={topic} />
                      ))}
                    </div>

                    <div class="media author">
                      <div class="p-2 media-left">
                        <a href={author.url}>
                          <figure class="image m-0 is-24x24">
                            <AuthorIcon {...author} />
                          </figure>
                        </a>
                      </div>
                      <div class="media-content">
                        <div class="content is-size-7">
                          <p class="m-0">
                            <a href={author.url}>{author.title}</a>
                          </p>
                          <time
                            class="m-0 has-text-grey-dark"
                            datetime={displayDate}
                          >
                            {displayDate}
                          </time>
                        </div>
                      </div>
                    </div>
                  </div>
                </footer>
              </div>
            </article>
          </div>
        </div>
      </div>
    );
  }
};

export default ResourceCard;
