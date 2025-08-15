import { useEffect, useMemo } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ListIcon from '@mui/icons-material/Reorder';
import { loadPosts } from '../posts/loadPosts';

export default function PostDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const posts = useMemo(() => loadPosts(), []);
  const post = posts.find((p) => p.slug === slug);
  const index = useMemo(() => posts.findIndex((p) => p.slug === slug), [posts, slug]);
  const prevPost = index >= 0 && index + 1 < posts.length ? posts[index + 1] : undefined; // older
  const nextPost = index > 0 ? posts[index - 1] : undefined; // newer

  useEffect(() => {
    // Ensure viewing starts at the top whenever the slug changes
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [slug]);

  if (!post) {
    return (
      <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', px: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Post not found</Typography>
        <Typography variant="body1">We couldn't find this post. Please go back to the posts list.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', px: 2 }}>
      <Typography variant="h4" sx={{ mb: 1, textAlign: 'left' }}>
        <strong>{post.title}</strong>
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'left', mb: 2 }}>
        {new Date(post.date).toLocaleDateString()}
      </Typography>
      {post.thumbnail && (
        <Box
          component="img"
          src={post.thumbnail}
          alt={post.title}
          sx={{ width: '100%', borderRadius: 2, mb: 2 }}
        />
      )}
      <Divider sx={{ mb: 2 }} />
      <Box component="article" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
        {post.content}
      </Box>
      <Divider sx={{ my: 3 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <IconButton
          aria-label="Previous post"
          component={RouterLink}
          to={prevPost ? `/posts/${prevPost.slug}` : '#'}
          disabled={!prevPost}
        >
          <ArrowBackIcon />
        </IconButton>
        <IconButton aria-label="List" component={RouterLink} to="/posts">
          <ListIcon />
        </IconButton>
        <IconButton
          aria-label="Next post"
          component={RouterLink}
          to={nextPost ? `/posts/${nextPost.slug}` : '#'}
          disabled={!nextPost}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Box>
  );
}



