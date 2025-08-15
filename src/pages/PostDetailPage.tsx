import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { loadPosts } from '../posts/loadPosts';

export default function PostDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const posts = useMemo(() => loadPosts(), []);
  const post = posts.find((p) => p.slug === slug);

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
      <Typography variant="h3" sx={{ mb: 1, textAlign: 'center' }}>{post.title}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 2 }}>
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
    </Box>
  );
}



