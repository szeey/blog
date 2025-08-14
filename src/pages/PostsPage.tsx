import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import { loadPosts } from '../posts/loadPosts';

export default function PostsPage() {
  const posts = loadPosts();
  return (
    <Box sx={{ width: '100%', maxWidth: 720, mx: 'auto', px: 2 }}>
      <Typography variant="h4" sx={{ mb: 1, textAlign: 'center' }}>Posts</Typography>
      <Typography sx={{ mb: 3, textAlign: 'center' }}>블로그 게시물 목록 페이지입니다.</Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {posts.map((post) => (
          <Card key={post.id} sx={{ borderRadius: 3, overflow: 'hidden' }}>
            <CardActionArea component={RouterLink} to={`/posts/${post.slug}`}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                <CardMedia
                  component="img"
                  image={post.thumbnail}
                  alt={post.title}
                  sx={{ width: { sm: 240 }, height: { xs: 180, sm: '100%' }, objectFit: 'cover' }}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {post.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Chip size="small" label={new Date(post.date).toLocaleDateString()} />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {post.excerpt}
                  </Typography>
                </CardContent>
              </Box>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
};